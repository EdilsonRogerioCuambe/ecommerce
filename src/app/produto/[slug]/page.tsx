import Breadcrums from '@/components/Breadcrums'
import DisplayProduto from '@/components/display-produto'
import Newsletter from '@/components/newsletter'
import ProdutosRelacionados from '@/components/produtos-relacionados'
import { getProduto } from '@/database'

export default async function ProdutoPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const produto = await getProduto(slug)

  return (
    produto && (
      <>
        <div className="md:mt-36 mt-20 max-w-7xl mx-auto">
          <DisplayProduto {...produto} />
          <ProdutosRelacionados />
        </div>
        <div className="mt-20">
          <Newsletter />
        </div>
      </>
    )
  )
}
