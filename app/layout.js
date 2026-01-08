import "../src/index.css";

export const metadata = {
  title: "Maxfolio",
  description: "A chaotic, comedic portfolio generator",
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
