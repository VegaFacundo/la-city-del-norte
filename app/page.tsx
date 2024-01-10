import { redirect } from 'next/navigation'
import Script from 'next/script'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Añayork',
  description: 'Añatuya servicios de la zona disponibles',
}

export default function Page() {
  redirect('/bares')

  // aqui agregar luego el arbol de los distintos servicios
  return <main>no se supone q se vea esta pagina :3</main>
}
