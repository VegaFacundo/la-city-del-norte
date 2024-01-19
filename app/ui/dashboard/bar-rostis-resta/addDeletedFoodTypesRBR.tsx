import { getAllFoodTypes } from '@/app/lib/actionsFolder/rosti-bares-resta'
import AddFoodType from './addFoodType'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import DeleteAddFoodType from './deleteAddFoodType'

const AddDeletedFoodTypesRBR = async ({
  idToEdit,
  foodTypesAsigned,
}: {
  idToEdit: string
  foodTypesAsigned:
    | {
        id: number
        id_restaurant: number
        id_food_type: number
        deleted: boolean
        food_type: { name: string }
      }[]
    | undefined
}) => {
  const allFoodTypes = await getAllFoodTypes()
  return (
    <div>
      <div className="p-4">
        <AddFoodType allFoodTypes={allFoodTypes} idToEdit={idToEdit} />
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
                        name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodTypesAsigned &&
                      foodTypesAsigned.map((foodTypesAsignedItem, index) => {
                        return (
                          <tr
                            key={`rosty-dashboard-${index}-${foodTypesAsignedItem.food_type.name}`}
                            className="border-b dark:border-neutral-500 "
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium flex justify-around">
                              <DeleteAddFoodType
                                idFoodType={foodTypesAsignedItem.id}
                                deleted={foodTypesAsignedItem.deleted}
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {foodTypesAsignedItem.food_type.name}
                            </td>
                          </tr>
                        )
                      })}
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

export default AddDeletedFoodTypesRBR
