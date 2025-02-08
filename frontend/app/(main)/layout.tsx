
import NavbarWrapper from '@/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("RootLayout Rendered");
  return (
    <>
      <nav><NavbarWrapper /> </nav>
        <div>
          {children}
        </div>
    </>
  );
};
