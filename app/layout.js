import "./globals.css";
/* WHITELINE: This is the "Frame" of your entire website. 
   It ensures your Aero background and fonts are applied 
   to every single page, including the Admin dashboard.
*/

export const metadata = {
  title: "Maximiliano Garcia | Creative Developer Portfolio",
  description: "A Frutiger Aero-inspired portfolio showcasing programming projects, utilities, and creative pixel art. Computer Science student passionate about web development, algorithms, and design.",
  keywords: "Maximiliano Garcia, Portfolio, Web Developer, Computer Science, React, Next.js, Python, Java, Frutiger Aero",
  authors: [{ name: "Maximiliano Garcia" }],
  creator: "Maximiliano Garcia",
  metadataBase: new URL('https://maxfolio-website.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maxfolio-website.vercel.app",
    title: "Maximiliano Garcia | Creative Developer Portfolio",
    description: "Explore my programming projects, utilities, and creative work in a Frutiger Aero-inspired environment.",
    siteName: "Maximiliano Garcia Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maximiliano Garcia | Creative Developer Portfolio",
    description: "Explore my programming projects, utilities, and creative work.",
    creator: "@maxgarcia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
