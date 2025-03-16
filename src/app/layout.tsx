export const metadata = {
  title: 'MTG_DB',
  description: 'database for Magic The Gathering',
}
import "@/app/global.css"
import styles from "@/styles/layout.module.css";
import Navbar from '@/app/components/navbarBandAid.tsx';
// import Navbar from '@/app/components/navbar.tsx';

// import NavbarWithSubmenu from '@/app/components/navbar.tsx';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <html lang="en">

        <body className="max-w-7xl mx-auto p-4">{children}</body>
      </html>
    </>
  );
}
