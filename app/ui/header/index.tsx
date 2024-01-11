import Image from 'next/image'
import LogoImage from '@/public/zorroizon.svg'
import Link from 'next/link'
const Header = () => {
  return (
    <header className="bg-red-700 text-white min-h-[80px] flex items-center p-4 rounded-b-md sm:text-xl justify-center flex-wrap">
      <div className="flex items-center ml-0 flex-1">
        <Link href="/">
          <Image
            src={LogoImage}
            alt="logo"
            priority
            className="w-24 min-w-[64px] "
          />
        </Link>
        <div className="mx-4">
          <h2 className="font-semibold sm:text-2xl">Añatuya</h2>
          <p className="lg:hidden block">Restaurantes, Bares y Rotisería</p>
        </div>
      </div>
      <div className="hidden lg:block grow">
        Restaurantes, Bares y Rotisería
      </div>
    </header>
  )
}

export default Header
