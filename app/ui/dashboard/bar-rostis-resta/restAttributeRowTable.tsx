'use client'
import { useEffect, useState } from 'react'
import ButtonIcon from '../../commons/ButtonIcon'
import DeleteAddFoodType from './deleteAddFoodType'
import {
  Cog6ToothIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import InputForm from '../../commons/InputForm'
import { editRestoBarRestaurantAttribute } from '@/app/lib/actionsFolder/rosti-bares-resta'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import DeleteReAddAttributeRBR from './deleteReAddAttributeRBR'

const RestAttributeRowTable = ({
  AttributeRBRAsignedItem,
  idForm,
  restaurantID,
}: {
  AttributeRBRAsignedItem: {
    id: number
    value: string
    observations: string | null
    deleted: boolean
    rest_attributes: { name: string }
  }
  idForm: string
  restaurantID: string
}) => {
  const initialState = {
    message: null,
    errors: {},
  }

  const router = useRouter()

  const editRestoBarRestaurantAttributeByID =
    editRestoBarRestaurantAttribute.bind(null, AttributeRBRAsignedItem.id)

  const [state, dispatch] = useFormState(
    editRestoBarRestaurantAttributeByID,
    initialState
  )
  const [isEditing, setIsEditing] = useState(false)
  const handleClickEdit = () => {
    setIsEditing((state) => !state)
  }
  useEffect(() => {
    if (state?.message == 'ok') {
      setIsEditing(false)
      state.message = ''
      router.refresh()
    }
  }, [state, router])

  return (
    <tr className="border-b dark:border-neutral-500 ">
      <form id={idForm} action={dispatch} />
      <td className="whitespace-nowrap px-6 py-4 font-medium flex justify-around items-center">
        {!isEditing && (
          <div className="flex justify-around items-center w-full">
            <DeleteReAddAttributeRBR
              idAttributeRBR={AttributeRBRAsignedItem.id}
              deleted={AttributeRBRAsignedItem.deleted}
            />
            <div className="px-2">|</div>
            <ButtonIcon onClick={handleClickEdit}>
              <Cog6ToothIcon width={24} height={24} color="black" />
            </ButtonIcon>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-around items-center w-full">
            <ButtonIcon type="submit" form={idForm}>
              <CheckIcon width={24} height={24} color="black" />
            </ButtonIcon>
            <div className="px-2">|</div>
            <ButtonIcon onClick={handleClickEdit}>
              <XMarkIcon width={24} height={24} color="black" />
            </ButtonIcon>
          </div>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {AttributeRBRAsignedItem.rest_attributes.name}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {!isEditing && AttributeRBRAsignedItem.value}
        {isEditing && (
          <div className="w-full">
            <InputForm
              maxWidth="15rem"
              label="Valor"
              inputName="value"
              defaultValue={AttributeRBRAsignedItem.value}
              idForm={idForm}
            />
            {state?.errors?.value}
          </div>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {!isEditing && AttributeRBRAsignedItem.observations}
        {isEditing && (
          <div className="w-full">
            <InputForm
              maxWidth="15rem"
              label="Observaciones"
              inputName="observations"
              defaultValue={AttributeRBRAsignedItem.observations ?? ''}
              idForm={idForm}
            />
            {state?.errors?.observations}
          </div>
        )}
      </td>
    </tr>
  )
}

export default RestAttributeRowTable
