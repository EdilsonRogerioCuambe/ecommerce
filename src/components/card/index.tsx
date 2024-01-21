'use client'
import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiShoppingCart } from 'react-icons/ci'
import { FaArrowRight } from 'react-icons/fa'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { CarrinhoContext } from '@/context/CarrinhoProvider'

interface CardProps {
  imagem: string
  nome: string
  preco: number
  promocao?: number
  slug: string
  id: string
}

export default function Card({
  id,
  imagem,
  nome,
  preco,
  promocao,
  slug,
}: CardProps) {
  const { carrinho, addCarrinho, removeCarrinho } = useContext(CarrinhoContext)
  const router = useRouter()
  const { user } = useUser()
  return (
    <div className="bg-white rounded-md shadow-md">
      <div className="relative h-96">
        <Image
          src={imagem}
          alt={nome}
          fill
          className="object-cover rounded-t-md w-full h-full"
        />
        <div className="absolute top-2 right-2">
          <button
            title="Adicionar ao carrinho"
            type="button"
            onClick={() => {
              if (user) {
                if (carrinho.some((produto) => produto.id === id)) {
                  removeCarrinho(user.emailAddresses[0].emailAddress, id)
                } else {
                  addCarrinho(user.emailAddresses[0].emailAddress, id)
                }
              } else {
                toast.error('Você precisa estar logado para fazer isso!')
                router.push('/signin')
              }
            }}
            className={`${
              carrinho.some((produto) => produto.id === id)
                ? 'bg-[#FDC648] text-white'
                : 'bg-white text-[#FDC648]'
            } p-2 rounded-full`}
          >
            <CiShoppingCart className="text-md" />
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <Link href={`/produto/${slug}`}>
          <h3 className="text-md text-[#424141] text-md truncate">{nome}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-[#424141] text-md font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(preco)}
          </p>
          {promocao && (
            <p className="text-[#424141] text-md line-through">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(promocao)}
            </p>
          )}
        </div>
      </div>
      <Link
        href={`/produto/${slug}`}
        className="items-center flex justify-between border-t text-white hover:text-[#FDC648] border-[#F2F2F2] bg-[#414242] p-5 transition-all duration-300 ease-in-out"
      >
        Ver mais
        <FaArrowRight />
      </Link>
    </div>
  )
}
