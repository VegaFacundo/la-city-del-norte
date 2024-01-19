import type { Metadata } from 'next'
import SearchButton from '@/app/ui/bares/searchButton'
import CardsSearch from '@/app/ui/bares/cardsSearch'
import { baresSearchParamsType } from '@/app/lib/types/definitions'
import { Suspense } from 'react'
import DashboardSkeleton from '../ui/skeletons'

export const metadata: Metadata = {
  title: 'Añatuya Bares',
  description: 'Añatuya bares de la ciudad',
}

const Bares = async ({
  searchParams,
}: {
  searchParams: baresSearchParamsType
}) => {
  return (
    <main className="mx-2">
      <div className="flex justify-center pt-4 px-4">
        <div className="w-full max-w-[24rem]">
          <SearchButton />
        </div>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>
        <CardsSearch query={searchParams} />
      </Suspense>
    </main>
  )
}

export default Bares
