'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Palette } from 'lucide-react';

// 16x16 grid for pixel art
const GRID_SIZE = 16;

// Predefined color palette (Frutiger Aero inspired)
const COLOR_PALETTE = [
  '#000000', '#FFFFFF', '#1098ba', '#000bbe', '#308a11', '#82c91e',
  '#FF0000', '#FF6B00', '#FFD93D', '#6BCF7F', '#4D96FF', '#A459D1',
  '#FF85C0', '#95E1D3', '#F38181', '#AA96DA'
];

export default function PixelStudio() {
  const [grid, setGrid] = useState(() => 
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('#FFFFFF'))
  );
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);

  // Handle pixel coloring
  const colorPixel = (row, col) => {
    const newGrid = grid.map((r, rIdx) => 
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? selectedColor : c))
    );
    setGrid(newGrid);
  };

  // Handle mouse events for drawing
  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    colorPixel(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isDrawing) {
      colorPixel(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Clear the canvas
  const clearCanvas = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('#FFFFFF')));
  };

  // Download as PNG (simple implementation)
  const downloadArt = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pixelSize = 20;
    canvas.width = GRID_SIZE * pixelSize;
    canvas.height = GRID_SIZE * pixelSize;

    grid.forEach((row, rIdx) => {
      row.forEach((color, cIdx) => {
        ctx.fillStyle = color;
        ctx.fillRect(cIdx * pixelSize, rIdx * pixelSize, pixelSize, pixelSize);
      });
    });

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="aero-card p-6 bg-white/60">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Canvas Area */}
          <div className="flex-1">
            <div 
              className="inline-grid gap-0 p-2 bg-slate-100 rounded-xl shadow-inner border-2 border-slate-300"
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                touchAction: 'none'
              }}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {grid.map((row, rIdx) => 
                row.map((color, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className="w-4 h-4 md:w-6 md:h-6 border border-slate-200 cursor-crosshair transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                    onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                    onTouchStart={() => {
                      setIsDrawing(true);
                      colorPixel(rIdx, cIdx);
                    }}
                    onTouchMove={(e) => {
                      if (isDrawing) {
                        const touch = e.touches[0];
                        const element = document.elementFromPoint(touch.clientX, touch.clientY);
                        if (element && element.dataset.row) {
                          colorPixel(parseInt(element.dataset.row), parseInt(element.dataset.col));
                        }
                      }
                    }}
                    onTouchEnd={() => setIsDrawing(false)}
                    data-row={rIdx}
                    data-col={cIdx}
                  />
                ))
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full md:w-64 space-y-4">
            {/* Color Palette */}
            <div className="bg-white/80 p-4 rounded-xl shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Palette size={16} /> Color Palette
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_PALETTE.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-aero-ocean scale-110 shadow-glow' 
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
              
              {/* Custom Color Picker */}
              <div className="mt-3">
                <label className="text-xs text-slate-600 mb-1 block">Custom Color</label>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer border-2 border-slate-300"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={downloadArt}
                className="w-full px-4 py-2 bg-gradient-to-b from-aero-sky to-aero-ocean text-white rounded-lg font-bold shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-2"
              >
                <Download size={16} /> Download
              </button>
              <button
                onClick={clearCanvas}
                className="w-full px-4 py-2 bg-white text-slate-700 rounded-lg font-bold border-2 border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Clear Canvas
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-3 rounded-lg text-xs text-slate-600">
              <p className="font-bold mb-1">How to use:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Click/drag to draw</li>
                <li>Select colors from palette</li>
                <li>Download your creation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
