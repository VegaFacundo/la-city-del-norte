import { getAllAttributesTypes } from '@/app/lib/actionsFolder/rosti-bares-resta'
import AddRestAttributeTypes from './addRestAttributeTypes'
import RestAttributeTable from './restAttributeTable'

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
        rest_attributes: { name: string }
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
        <RestAttributeTable
          idToEdit={idToEdit}
          restAttributesAsigned={restAttributesAsigned}
        />
      </div>
    </div>
  )
}

export default AddDeletedRestAttributesRBR
