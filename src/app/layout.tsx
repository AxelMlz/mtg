export const metadata = {
  title: 'MTG_DB',
  description: 'database for Magic The Gathering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
