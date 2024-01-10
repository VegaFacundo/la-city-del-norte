import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-red-900 text-white min-h-[80px] p-4 rounded-t-md sm:text-xl flex justify-around flex-wrap items-center mt-auto">
      <div className="flex flex-col">
        <p>Contacto</p>
        <a href="mailto:vegafacundo187@gmail.com">vegafacundo187@gmail.com</a>
      </div>
      <div>
        <Link href="/terminos-y-condiciones">Términos y condiciones</Link>
      </div>
    </footer>
  )
}
export default Footer
