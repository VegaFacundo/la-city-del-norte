import { Inter, Lusitana, Lato, Nunito } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })

export const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
})

export const nunito = Nunito({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
})

export const lusitana = Lusitana({ weight: ['400', '700'], subsets: ['latin'] })
