import { SignUp } from '@clerk/nextjs'

export default function Cadastro() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignUp />
    </div>
  )
}
