import React from 'react';
import { useParams } from 'react-router-dom';
import { generateRandom } from '../../../lib/generators';

export default function Profile() {
  const themes = [
    'bg-[#c0c0c0] text-black shadow-[inset_1px_1px_#dfdfdf,1px_1px_#000000,2px_2px_#808080]',
    'bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  ];
  const { username } = useParams();
  const theme = generateRandom(themes);

  return (
    <div className={`min-h-screen ${theme} flex flex-col items-center justify-center p-8`}>
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="w-32 h-32 bg-white rounded-full mx-auto mb-8 flex items-center justify-center text-4xl">
          👽
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tighter">@{username}</h1>
        <p className="text-2xl font-bold italic opacity-80">Chief Vibe Officer</p>
        <div className="h-px bg-current opacity-20 w-full my-8"></div>
        <p className="text-xl leading-relaxed">
          Just a cosmic entity trying to navigate the digital void one pixel at a time. I specialize in making things slightly more complicated than they need to be.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {['Chaos', 'Minimalism', 'Napping'].map(s => (
            <span key={s} className="px-4 py-1 border-2 border-current rounded-full text-sm font-bold">
              #{s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
