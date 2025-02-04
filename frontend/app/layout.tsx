

export default function RootLayout({children,}: {children: React.ReactNode; }) {
  return (  
    <html lang="en">
      <body>
        <div>
          nav bar here
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}

