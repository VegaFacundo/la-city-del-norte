import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import CreateFormRBR from '@/app/ui/dashboard/bar-rostis-resta/createFormRBR'

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Rostis-Bares-Restaurantes(RBR)',
            href: '/dashboard/bar-rostis-resta',
          },
          {
            label: 'Create',
            href: '/dashboard/bar-rostis-resta/create',
            active: true,
          },
        ]}
      />
      <CreateFormRBR />
    </main>
  )
}
