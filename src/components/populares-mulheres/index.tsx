import { FaArrowRight } from 'react-icons/fa'

import Card from '../card'
import Link from 'next/link'
import { getProdutos } from '@/database'

interface Categoria {
  createdAt: string
  id: string
  nome: string
  slug: string
  updatedAt: string
}

interface Produto {
  nome: string
  preco: number
  promocao: number
  publishedAt: string
  slug: string
  tamanhos: string[]
  updatedAt: string
  variantes: {
    url: string
  }[]
  id: string
  imagem: {
    url: string
  }
  descricao: string
  createdAt: string
  categorias: Categoria[]
}

export default async function PopularesMulheres() {
  const produtos = await getProdutos()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex p-5">
        <h2 className="md:text-2xl text-md text-[#424141] font-bold border-b-4 uppercase border-b-[#414242]">
          Produtos Populares para Mulheres
        </h2>
        <Link
          href="/categoria/mulheres"
          className="flex items-center ml-auto gap-2 hover:border-b-2 hover:border-[#FDC648] transition-all duration-300 ease-in-out"
        >
          <p className="text-[#424141]">Ver mais</p>
          <FaArrowRight className="text-[#424141]" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {produtos
          ?.slice(0, 8)
          .map((produto: Produto) => (
            <Card
              key={produto.id}
              id={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem.url}
              promocao={produto.promocao}
              slug={produto.slug}
            />
          ))}
      </div>
    </div>
  )
}
