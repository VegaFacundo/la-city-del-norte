import { getRostyBarsRestaurantByID } from '@/app/lib/data'
import AddDeletedFoodTypesRBR from '@/app/ui/dashboard/bar-rostis-resta/addDeletedFoodTypesRBR'
import AddDeletedRestAttributesRBR from '@/app/ui/dashboard/bar-rostis-resta/addDeletedRestAttributesRBR'
import EditFormRBR from '@/app/ui/dashboard/bar-rostis-resta/editFormRBR'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const EditRestaurantBarRosti = async ({
  params,
}: {
  params: { id: string }
}) => {
  const RestoBarRostiData = await getRostyBarsRestaurantByID({
    idToSearch: params.id,
  })

  if (!RestoBarRostiData) {
    notFound()
  }

  return (
    <div className="w-full">
      <Suspense fallback={<div>Cargando rbr...</div>}>
        <EditFormRBR
          defaultData={RestoBarRostiData.rostyBarResta}
          idToEdit={params.id}
        />
      </Suspense>

      <Suspense fallback={<div>Cargando tipos de comida asociados...</div>}>
        <AddDeletedFoodTypesRBR
          foodTypesAsigned={RestoBarRostiData.rostyBarResta?.foodTypes}
          idToEdit={params.id}
        />
      </Suspense>
      <Suspense fallback={<div>Cargando tipos de atributos...</div>}>
        <div className="py-4">
          <AddDeletedRestAttributesRBR
            restAttributesAsigned={
              RestoBarRostiData.rostyBarResta?.restAtributtes
            }
            idToEdit={params.id}
          />
        </div>
      </Suspense>
    </div>
  )
}

export default EditRestaurantBarRosti
