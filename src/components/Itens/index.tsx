'use client'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Produto } from '@/database'
import { CarrinhoContext } from '@/context/CarrinhoProvider'

export default function Itens({
  carrinho,
  email,
}: {
  carrinho: Produto[]
  email: string
}) {
  const router = useRouter()
  const { removeCarrinho } = useContext(CarrinhoContext)
  const [total, setTotal] = useState(0)

  const handleRemoveCarrinho = async (id: string) => {
    await removeCarrinho(email, id)
    router.refresh()
  }

  useEffect(() => {
    const novoTotal = carrinho.reduce((acc, produto) => acc + produto.preco, 0)
    setTotal(novoTotal)
  }, [carrinho])

  return (
    <div className="flex flex-col md:flex-row md:space-x-6">
      <div className="flex flex-col md:w-3/4 px-6 md:px-0">
        {carrinho.map((produto) => (
          <div
            key={produto.id}
            className="flex flex-col md:flex-row md:space-x-6 border-b-2 border-[#E5E5E5] pb-6 mb-6"
          >
            <div className="flex flex-col md:w-1/4">
              <Image
                src={produto.imagem.url}
                alt={produto.nome}
                width={150}
                height={150}
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col md:w-3/4">
              <h3 className="text-[#424141] text-lg font-bold">
                {produto.nome}
              </h3>
              <p className="text-[#424141] text-sm mt-2">{produto.descricao}</p>
              <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
                <div className="flex flex-col md:w-1/2">
                  <p className="text-[#424141] text-sm font-bold">Tamanho</p>
                  <p className="text-[#424141] text-sm mt-2">
                    {produto.tamanhos.join(', ')}
                  </p>
                </div>
                <div className="flex flex-col md:w-1/2">
                  <p className="text-[#424141] text-sm font-bold">Preço</p>
                  <p className="text-[#424141] text-sm mt-2">
                    {produto.preco.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveCarrinho(produto.id)}
                className="text-white bg-red-400 rounded-md hover:bg-red-600 py-2 text-sm mt-4 hover:text-[#FDC648] transition-all duration-300 ease-in-out"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:w-1/4 px-4 md:px-0 mb-20 md:mb-0">
        <div className="flex flex-col border-2 border-[#E5E5E5] rounded-md p-4">
          <h3 className="text-[#424141] text-lg font-bold">Resumo</h3>
          <div className="flex flex-col mt-4">
            <div className="flex justify-between">
              <p className="text-[#424141] text-sm">Subtotal</p>
              <p className="text-[#424141] text-sm">
                {total.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-[#424141] text-sm">Entrega</p>
              <p className="text-[#424141] text-sm">Grátis</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-[#424141] text-sm">Total</p>
              <p className="text-[#424141] text-sm">
                {total.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
          </div>
          <button className="bg-[#FDC648] text-[#424141] text-sm mt-4 py-2 rounded-md hover:bg-[#FDC648] transition-all duration-300 ease-in-out">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}
