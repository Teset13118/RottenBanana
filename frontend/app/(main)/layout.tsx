
import NavbarWrapper from '@/app/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav><NavbarWrapper /> </nav>
        <div>
          {children}
        </div>
    </>
  );
};
