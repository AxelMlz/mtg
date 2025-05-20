export const metadata = {
  title: 'MTG_DB',
  description: 'database for Magic The Gathering',
}
import "@/app/global.css"
import styles from "@/styles/layout.module.css";
import Navbar from '@/app/components/navbarBandAid.tsx';
import SubNavbar from '@/app/components/subNavbar.tsx';

// import NavbarWithSubmenu from '@/app/components/navbar.tsx';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <NavbarWithSubmenu /> */}
      <Navbar />
      {/* <SubNavbar /> */}
      <html lang="en">

        <body className={styles.container}>{children}</body>
      </html>
    </>
  );
}
