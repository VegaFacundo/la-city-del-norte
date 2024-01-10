import { redirect } from 'next/navigation'

const notFOund = () => {
  redirect('/dashboard')
}

export default notFOund
