import '../src/style.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="m-0 p-0 bg-transparent">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Animation App</title>
      </head>
      <body className="!m-0 !p-0 bg-black">
        {children}
      </body>
    </html>
  );
}