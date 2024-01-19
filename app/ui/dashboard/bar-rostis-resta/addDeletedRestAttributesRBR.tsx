import { getAllAttributesTypes } from '@/app/lib/actionsFolder/rosti-bares-resta'
import AddFoodType from './addFoodType'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import DeleteAddFoodType from './deleteAddFoodType'
import AddRestAttributeTypes from './addRestAttributeTypes'

const AddDeletedRestAttributesRBR = async ({
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
      }[]
    | undefined
}) => {
  const { allRestAttributesTypes } = await getAllAttributesTypes()
  return (
    <div>
      <div className="p-4">
        <AddRestAttributeTypes
          allRestAttributesTypes={allRestAttributesTypes}
          idToEdit={idToEdit}
        />
      </div>
      <div className="p-4">
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
                        Valor
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Descripcion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {restAttributesAsigned &&
                      restAttributesAsigned.map(
                        (foodTypesAsignedItem, index) => {
                          return (
                            <tr
                              key={`rosty-dashboard-${index}-${foodTypesAsignedItem.id}`}
                              className="border-b dark:border-neutral-500 "
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium flex justify-around">
                                <DeleteAddFoodType
                                  idFoodType={foodTypesAsignedItem.id}
                                  deleted={foodTypesAsignedItem.deleted}
                                />
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {foodTypesAsignedItem.value}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {foodTypesAsignedItem.observations}
                              </td>
                            </tr>
                          )
                        }
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDeletedRestAttributesRBR
