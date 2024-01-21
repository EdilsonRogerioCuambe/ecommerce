import Hero from '@/components/hero'
import Newsletter from '@/components/newsletter'
import Ofertas from '@/components/ofertas'
import Populares from '@/components/populares'
import PopularesMulheres from '@/components/populares-mulheres'

import { getBanner } from '@/database'

interface Banner {
  id: string
  nome: string
  slug: string
  imagem: {
    url: string
  }
}

async function getBanners() {
  const banners: Banner[] = []
  const bannersSlugs = ['produtos-populares', 'populares-mulheres', 'ofertas']
  for (const slug of bannersSlugs) {
    const banner = await getBanner({ slug })
    if (banner) {
      banners.push(banner)
    }
  }
  return banners
}

export default async function Home() {
  const banners = await getBanners()

  return (
    <div>
      <Hero image={banners[0].imagem.url} />
      <div className="max-w-7xl mx-auto">
        <Populares />
      </div>
      <Hero image={banners[1].imagem.url} />
      <div className="max-w-7xl mx-auto">
        <PopularesMulheres />
      </div>
      <Hero image={banners[2].imagem.url} />
      <div className="max-w-7xl mx-auto">
        <Ofertas />
      </div>
      <Newsletter />
    </div>
  )
}
