import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import DeleteAddFoodType from './deleteAddFoodType'
import RestAttributeRowTable from './restAttributeRowTable'

const RestAttributeTable = ({
  idToEdit,
  restAttributesAsigned,
}: {
  idToEdit: string
  restAttributesAsigned:
    | {
        id: number
        value: string
        observations: string | null
        deleted: boolean
        rest_attributes: { name: string }
      }[]
    | undefined
}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col " className="px-6 py-4">
                    <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Descripcion
                  </th>
                </tr>
              </thead>
              <tbody>
                {restAttributesAsigned &&
                  restAttributesAsigned.map((foodTypesAsignedItem, index) => {
                    return (
                      <RestAttributeRowTable
                        foodTypesAsignedItem={foodTypesAsignedItem}
                        idForm={`rosty-dashboard-${index}-${foodTypesAsignedItem.rest_attributes.name}`}
                        key={`rosty-dashboard-${index}-${foodTypesAsignedItem.id}`}
                        restaurantID={idToEdit}
                      />
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestAttributeTable
