import { baresSearchParamsType } from '@/app/lib/types/definitions'
import SearchButton from '@/app/ui/bares/searchButton'
import ListSearchRBR from '@/app/ui/dashboard/bar-rostis-resta/listSearchRBR'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Invoices({
  searchParams,
}: {
  searchParams: baresSearchParamsType
}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center flex-wrap">
        <h1 className={`text-2xl pr-2`}>
          Rostis, Bares y Restaurantes {'(RBR)'}
        </h1>
        <div>
          <Link href="/dashboard/bar-rostis-resta/create">Crear RBR</Link>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchButton />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<div>Cargando...</div>}>
          <ListSearchRBR query={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
