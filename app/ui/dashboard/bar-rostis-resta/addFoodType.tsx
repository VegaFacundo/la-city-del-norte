'use client'

import { addFoodTypeToRestoBarRestaurant } from '@/app/lib/actionsFolder/rosti-bares-resta'
import { Button } from '@/app/ui/button'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AddFoodType = ({
  allFoodTypes,
  idToEdit,
}: {
  allFoodTypes: {
    allFodTypes: {
      id: number
      name: string
      deleted: boolean
      deleted_at: Date
    }[]
  }
  idToEdit: string
}) => {
  const initialState = {
    message: null,
    errors: {},
  }
  const router = useRouter()
  const addFoodTypeToRestoBarRestaurantWithRBRID =
    addFoodTypeToRestoBarRestaurant.bind(null, idToEdit)

  const [state, dispatch] = useFormState(
    addFoodTypeToRestoBarRestaurantWithRBRID,
    initialState
  )

  useEffect(() => {
    if (state?.message == 'ok') {
      router.refresh()
    }
  }, [state, router])

  return (
    <form action={dispatch} className="flex flex-wrap">
      <div className="relative w-72 min-w-[200px] pb-2">
        <select
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          name="id_food_type"
        >
          {allFoodTypes.allFodTypes &&
            allFoodTypes.allFodTypes.map((foodType, index) => {
              return (
                <option
                  key={`add-food-type-${index}-${foodType.name}`}
                  value={foodType.id}
                  id="id_food_type"
                >
                  {foodType.name}
                </option>
              )
            })}
        </select>
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Seleccionar tipo de comida
        </label>
      </div>
      <div className="pl-4">
        <Button type="submit">Agregar tipo de comida</Button>
      </div>
      {state?.message && <div className="w-full">{state?.message}</div>}
    </form>
  )
}

export default AddFoodType
