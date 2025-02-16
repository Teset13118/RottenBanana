
import NavbarWrapper from '@/app/components/navbar';
// import "@/styles/globals.css";


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
