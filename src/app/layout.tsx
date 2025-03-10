export const metadata = {
  title: 'MTG_DB',
  description: 'database for Magic The Gathering',
}

import './globals.css'
// import Navbar from '@/app/components/navbar.jsx';
import Navbar from '@/app/components/navbarBandAid.tsx';

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
