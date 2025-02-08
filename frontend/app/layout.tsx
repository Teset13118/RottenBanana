import NavbarWrapper from '@/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("RootLayout Rendered");
  return (
    <html lang="en">
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
};
  