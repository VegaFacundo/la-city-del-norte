'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { useFormState } from 'react-dom'
import { createRestoBarRestaurant } from '@/app/lib/actionsFolder/rosti-bares-resta'

const CreateFormRBR = () => {
  const initialState = {
    message: null,
    errors: {},
  }
  const [state, dispatch] = useFormState(createRestoBarRestaurant, initialState)
  const formItems: { field: string; fieldLabel: string; required: boolean }[] =
    [
      {
        field: 'name',
        fieldLabel: 'Nombre',
        required: true,
      },
      {
        field: 'street',
        fieldLabel: 'Calle',
        required: true,
      },
      {
        field: 'street_number',
        fieldLabel: 'Numero de calle',
        required: true,
      },
      {
        field: 'description',
        fieldLabel: 'Descripcion',
        required: false,
      },
      {
        field: 'work_time',
        fieldLabel: 'Horario de trabajo',
        required: false,
      },
      {
        field: 'phone',
        fieldLabel: 'Telefono principal',
        required: false,
      },
      {
        field: 'phone',
        fieldLabel: 'Telefono secundario',
        required: false,
      },
    ]

  return (
    <form action={dispatch} className="my-4" autoComplete="off">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {formItems.map((formItem, index) => {
          return (
            <div className="mb-4" key={`${index}-${formItem.field}`}>
              <label
                htmlFor={formItem.field}
                className="mb-2 block text-sm font-medium"
              >
                {formItem.fieldLabel}
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id={formItem.field}
                    name={formItem.field}
                    placeholder={formItem.fieldLabel}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required={formItem.required}
                  />
                </div>
              </div>
              {(state.errors as any)[formItem.field]?.length > 0 && (
                <div
                  id="customer-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {(state.errors as any)[formItem.field].map(
                    (error: string) => {
                      return <p key={error}>{error}</p>
                    }
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/bar-rostis-resta"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Create RBR</Button>
      </div>
    </form>
  )
}

export default CreateFormRBR
