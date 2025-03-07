import NavbarWrapper from '@/app/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-gray-900'>
        <nav><NavbarWrapper /> </nav>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
};
  