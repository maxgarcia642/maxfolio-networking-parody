import "./globals.css";

export const metadata = {
  title: "Maxfolio - Chaotic Portfolio Generator",
  description: "A comedic, minimalist portfolio generator with Windows 95 aesthetics. Generate absurd, randomized personal portfolios and share them with the void.",
  keywords: ["portfolio", "generator", "windows 95", "retro", "comedy", "web app"],
  authors: [{ name: "Maxfolio Team" }],
  openGraph: {
    title: "Maxfolio - Chaotic Portfolio Generator",
    description: "Generate absurd, randomized portfolios and share them with the void.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
