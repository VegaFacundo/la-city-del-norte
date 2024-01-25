'use client'

import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { deleteReAddAttributeRestoBarRestaurant } from '@/app/lib/actionsFolder/rosti-bares-resta'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ButtonIcon from '../../commons/ButtonIcon'

const DeleteReAddAttributeRBR = ({
  idAttributeRBR,
  deleted,
}: {
  idAttributeRBR: number
  deleted: boolean
}) => {
  const deleteReAddAttributeRestoBarRestaurantByID =
    deleteReAddAttributeRestoBarRestaurant.bind(null, idAttributeRBR)
  const [state, dispatch] = useFormState(
    deleteReAddAttributeRestoBarRestaurantByID,
    null
  )
  const router = useRouter()

  useEffect(() => {
    if (state?.message == 'ok') {
      router.refresh()
    }
  }, [state, router])

  return (
    <form action={dispatch}>
      <ButtonIcon type="submit">
        {deleted && <PlusIcon className="w-5 h-5" color="black" />}
        {!deleted && <TrashIcon className="w-5 h-5" color="black" />}
      </ButtonIcon>
    </form>
  )
}

export default DeleteReAddAttributeRBR
