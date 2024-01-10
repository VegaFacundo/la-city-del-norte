import '@/app/ui/global.css'
import { lato } from '@/app/ui/fonts'
import Header from '@/app/ui/header'
import Footer from '@/app/ui/footer'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  icons: {
    icon: '/zorroizon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased flex flex-col`}
        style={{ minHeight: '100dvh' }}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
        <GoogleTagManager gtmId="G-C0CSW8J3FG" />
        <SpeedInsights />
      </body>
    </html>
  )
}
