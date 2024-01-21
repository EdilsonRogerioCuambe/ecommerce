'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Produto, getCarrinhoUsuario } from '@/database'
import Itens from '@/components/Itens'

export default function CarrinhoPage() {
  const { user } = useUser()
  const [carrinho, setCarrinho] = useState<Produto[]>()

  const email = user?.emailAddresses[0].emailAddress

  useEffect(() => {
    const getCarrinho = async () => {
      if (email) {
        const carrinho = await getCarrinhoUsuario(email)
        setCarrinho(carrinho)
      }
    }
    getCarrinho()
  }, [email])

  if (!email) return null

  return (
    carrinho && (
      <div className="md:mt-36 mt-20 max-w-7xl mx-auto">
        <h2 className="text-[#414242] px-4 text-2xl mb-10 md:text-3xl font-bold mt-8">
          Meu Carrinho
        </h2>
        <Itens carrinho={carrinho} email={email} />
      </div>
    )
  )
}
