'use client'

import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { deleteReAddRestoBarRestaurant } from '@/app/lib/actionsFolder/rosti-bares-resta'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const DeleteAddRBR = ({
  idRestauarnt,
  deleted,
}: {
  idRestauarnt: number
  deleted: boolean
}) => {
  const deleteReAddRestoBarRestaurantByID = deleteReAddRestoBarRestaurant.bind(
    null,
    idRestauarnt
  )
  const [state, dispatch] = useFormState(
    deleteReAddRestoBarRestaurantByID,
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
      <button
        data-te-ripple-init
        data-te-ripple-color="light"
        className="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        type="submit"
      >
        {deleted && <PlusIcon className="w-5 h-5" color="black" />}
        {!deleted && <TrashIcon className="w-5 h-5" color="black" />}
      </button>
    </form>
  )
}

export default DeleteAddRBR
