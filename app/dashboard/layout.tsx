import SideNav from '@/app/ui/dashboard/sidenav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col md:flex-row md:overflow-hidden flex-grow">
      <div className="w-full flex-none md:w-64 h-full">
        <SideNav />
      </div>
      <div className="flex-grow p-2 md:p4 lg:p-8 md:overflow-y-auto ">
        {children}
      </div>
    </div>
  )
}
