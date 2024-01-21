import { getProdutosPorCategoria } from '@/database'
import Card from '@/components/card'

interface Categoria {
  createdAt: string
  id: string
  nome: string
  slug: string
  updatedAt: string
}

export interface Produto {
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

export default async function Categoria({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const produtos = await getProdutosPorCategoria(slug)

  return (
    <div className="my-36 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-[#414242]">
        {produtos?.produtos[0]?.categorias[0]?.nome}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {produtos?.produtos?.map((produto) => (
          <Card
            key={produto.id}
            imagem={produto.imagem.url}
            nome={produto.nome}
            id={produto.id}
            preco={produto.preco}
            slug={produto.slug}
            promocao={produto.promocao}
          />
        ))}
      </div>
    </div>
  )
}
