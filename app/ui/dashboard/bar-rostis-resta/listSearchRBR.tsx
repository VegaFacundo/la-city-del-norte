import { getRostyBarsRestaurantAdmin } from '@/app/lib/data'
import { baresSearchParamsType } from '@/app/lib/types/definitions'
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import DeleteAddRBR from './deleteAddRBR'
import ButtonIcon from '../../commons/ButtonIcon'

const ListSearchRBR = async ({ query }: { query: baresSearchParamsType }) => {
  const rostisbarsResponse = await getRostyBarsRestaurantAdmin({ query })
  return (
    <section className="w-full">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    </th>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Calle
                    </th>
                    <th scope="col" className="px-6 py-4">
                      N*
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Celular
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Celular auxiliar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rostisbarsResponse.rostyBarResta.map(
                    (rostyBarRestaItem, index) => {
                      return (
                        <tr
                          key={`rosty-dashboard-${index}-${rostyBarRestaItem.name}`}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium flex justify-between">
                            <ButtonIcon>
                              <Link
                                href={`/dashboard/bar-rostis-resta/${rostyBarRestaItem.id}/edit`}
                              >
                                <Cog6ToothIcon
                                  className="w-5 h-5"
                                  color="black"
                                />
                              </Link>
                            </ButtonIcon>

                            <DeleteAddRBR
                              idRestauarnt={rostyBarRestaItem.id}
                              deleted={rostyBarRestaItem.deleted}
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {rostyBarRestaItem.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {rostyBarRestaItem.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {rostyBarRestaItem.street}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {rostyBarRestaItem.street_number || 'No posee'}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {rostyBarRestaItem.phone || 'No posee'}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {rostyBarRestaItem.phone2 || 'No posee'}
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
    </section>
  )
}

export default ListSearchRBR
