import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-[#414242] uppercase">
              E-commerce
            </h2>
            <ul className="text-[#414242] font-medium">
              <li className="mb-4">
                <Link href="/produtos" className=" hover:underline">
                  Produtos
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/categoria/homens" className="hover:underline">
                  Homens
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/categoria/mulheres" className="hover:underline">
                  Mulheres
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/caategoria/criancas" className="hover:underline">
                  Crianças
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-[#414242] uppercase">
              Central de ajuda
            </h2>
            <ul className="text-[#414242] font-medium">
              <li className="mb-4">
                <Link href="/discord" className="hover:underline">
                  Discord
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/twitter" className="hover:underline">
                  Twitter
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/facebook" className="hover:underline">
                  Facebook
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/contato" className="hover:underline">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-[#414242]">Legal</h2>
            <ul className="text-[#414242] font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Politicas de privacidade
                </a>
              </li>
              <li className="mb-4">
                <Link href="/licensa" className="hover:underline">
                  Liçensa
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/termos-condicoes" className="hover:underline">
                  Termos &amp; Condições
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-[#414242] sm:text-center">
            © {new Date().getFullYear()}{' '}
            <a href="https://github.com/edilsonrogeriocuaambe">
              Edilson Rogério Cuambe
            </a>
            . Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
