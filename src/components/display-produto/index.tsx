'use client'
import { useContext, useState } from 'react'
import Image from 'next/image'
import { CiShoppingCart } from 'react-icons/ci'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'

import { Produto } from '@/database'

import { CarrinhoContext } from '@/context/CarrinhoProvider'

export default function DisplayProduto(produto: Produto) {
  const { carrinho, addCarrinho, removeCarrinho } = useContext(CarrinhoContext)
  const router = useRouter()
  const { user } = useUser()

  const [imagemPrincipal, setImagemPrincipal] = useState(produto.imagem.url)

  const trocarImagem = (novaImagemUrl: string) => {
    setImagemPrincipal(novaImagemUrl)
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex mx-4 md:mx-0 flex-col gap-4 mb-4">
        <div className="relative w-full h-64 md:w-[586px] md:h-[700px]">
          <Image
            src={imagemPrincipal}
            alt={produto.nome}
            layout="fill"
            className="rounded-md object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-4 px-4 mx-auto">
          {produto.variantes.map((variante) => (
            <div
              key={variante.url}
              className="relative h-20 w-20 md:w-32 md:h-32 cursor-pointer"
              onClick={() => trocarImagem(variante.url)}
            >
              <Image
                src={variante.url}
                alt={variante.url}
                layout="fill"
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 ">
        <h1 className="text-2xl font-semibold text-[#414242]">
          {produto.nome}
        </h1>
        <div className="flex gap-1">
          {produto.categorias.map((categoria) => (
            <span
              key={categoria.id}
              className="bg-gray-200 rounded-full px-2 py-1 text-sm lowercase"
            >
              {categoria.nome}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="text-lg font-semibold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(produto.promocao ? produto.promocao : produto.preco)}
          </div>
          {produto.promocao && (
            <div className="text-lg font-semibold text-[#414242] line-through">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(produto.preco)}
            </div>
          )}
        </div>
        <div className="text-[#414242] text-md leading-8">
          {produto.descricao}
        </div>
        <div>
          <h2 className="text-[#414242]">Selecione tamanho</h2>
          <div className="flex gap-2">
            {produto.tamanhos.map((tamanho) => (
              <div key={tamanho} className="px-3 py-1 border rounded">
                {tamanho}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            title="Adicionar ao carrinho"
            type="button"
            onClick={() => {
              if (user) {
                if (
                  carrinho.some(
                    (produtoNoCarrinho) => produtoNoCarrinho.id === produto.id,
                  )
                ) {
                  removeCarrinho(
                    user.emailAddresses[0].emailAddress,
                    produto.id,
                  )
                } else {
                  addCarrinho(user.emailAddresses[0].emailAddress, produto.id)
                }
              } else {
                toast.error('Você precisa estar logado para fazer isso!')
                router.push('/signin')
              }
            }}
            className={`${
              carrinho.some(
                (produtoNoCarrinho) => produtoNoCarrinho.id === produto.id,
              )
                ? 'bg-red-400 text-white'
                : 'bg-gray-200 text-[#414242]'
            } p-2 rounded-md flex items-center gap-2`}
          >
            <CiShoppingCart className="text-md" size={24} />
            {carrinho.some(
              (produtoNoCarrinho) => produtoNoCarrinho.id === produto.id,
            )
              ? 'Remover do carrinho'
              : 'Adicionar ao carrinho'}
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-md">
            Comprar agora
          </button>
        </div>
      </div>
    </div>
  )
}
