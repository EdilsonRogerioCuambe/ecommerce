'use client'
import { useState, useEffect, useCallback, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CiShoppingCart } from 'react-icons/ci'
import { MdClose, MdMenu } from 'react-icons/md'
import { UserButton, useUser } from '@clerk/nextjs'
import { getUsuario, criarUsuario } from '@/database'
import { CarrinhoContext } from '@/context/CarrinhoProvider'

import logo from '@images/logo.svg'

export default function Navbar() {
  const { user } = useUser()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { carrinho } = useContext(CarrinhoContext)

  const nome = user?.fullName
  const email = user?.emailAddresses[0].emailAddress
  const avatar = user?.imageUrl

  const handleCriarUsuario = useCallback(async () => {
    if (user) {
      const usuario = await getUsuario(email as string)
      if (!usuario && nome && email && avatar) {
        await criarUsuario(email, nome, avatar)
      }
    }
  }, [user, nome, email, avatar])

  useEffect(() => {
    handleCriarUsuario()
  }, [handleCriarUsuario])

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className="flex md:justify-around justify-between p-4 md:shadow-md bg-white items-center fixed right-0 left-0 top-0 z-50">
        <div className="lg:flex hidden gap-1 items-center">
          <Image
            src={logo}
            alt="logo"
            width={24}
            height={24}
            className="object-cover w-24"
          />
          <p className="md:text-2xl uppercase text-[#FDC648] font-extrabold tracking-widest text-xl">
            E-<span className="text-[#424141]">commerce</span>
          </p>
        </div>
        <p className="lg:hidden md:text-2xl uppercase text-[#FDC648] font-extrabold tracking-widest text-xl">
          E-<span className="text-[#424141]">commerce</span>
        </p>
        <div className="hidden md:flex items-center gap-12 text-[#424141] text-xl">
          <Link
            className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#FDC648] ${
              pathname === '/' ? 'border-b-2 border-[#424141]' : ''
            }`}
            href="/"
          >
            Produtos
          </Link>
          <Link
            href="/categoria/homens"
            className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#FDC648] ${
              pathname === '/categoria/homens'
                ? 'border-b-2 border-[#424141]'
                : ''
            }`}
          >
            Homens
          </Link>
          <Link
            href="/categoria/mulheres"
            className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#FDC648] ${
              pathname === '/categoria/mulheres'
                ? 'border-b-2 border-[#424141]'
                : ''
            }`}
          >
            Mulheres
          </Link>
          <Link
            href="/categoria/calcados"
            className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#FDC648] ${
              pathname === '/categoria/calcados'
                ? 'border-b-2 border-[#424141]'
                : ''
            }`}
          >
            Calçados
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[#424141] text-xl">
          {user ? (
            <>
              <Link href="/carrinho">
                <div className="relative">
                  <CiShoppingCart size={28} />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                    {carrinho.length}
                  </span>
                </div>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="border-2 border-[#424141] px-3 rounded-3xl"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="border-2 border-[#424141] px-3 rounded-3xl"
              >
                Cadastro
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={handleOpen}
            className="focus:outline-none"
            type="button"
          >
            {open ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>
      </div>
      <div
        className={`${
          open ? 'flex h-screen' : 'hidden'
        } flex-col items-center justify-center gap-12 p-4 text-[#424141] text-xl fixed right-0 left-0 top-0 z-40 bg-white transition-all duration-300 ease-in-out`}
      >
        <Link
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#FDC648] ${
            pathname === '/' ? 'border-b-2 border-[#424141]' : ''
          }`}
          href="/"
        >
          Produtos
        </Link>
        <Link
          href="/categoria/homens"
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#FDC648] ${
            pathname === '/homens' ? 'border-b-2 border-[#424141]' : ''
          }`}
        >
          Homens
        </Link>
        <Link
          href="/categoria/mulheres"
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#FDC648] ${
            pathname === '/mulheres' ? 'border-b-2 border-[#424141]' : ''
          }`}
        >
          Mulheres
        </Link>
        <Link
          href="/categoria/criancas"
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:border-b-2 hover:border-[#FDC648] ${
            pathname === '/criancas' ? 'border-b-2 border-[#424141]' : ''
          }`}
        >
          Crianças
        </Link>
        <div className="flex items-center justify-between gap-12 p-4 text-[#424141] text-xl">
          {user ? (
            <>
              <Link href="/carrinho">
                <div className="relative">
                  <CiShoppingCart size={28} />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                    {carrinho.length}
                  </span>
                </div>
              </Link>
              <UserButton afterSignOutUrl="/login" />
            </>
          ) : (
            <Link
              href="/login"
              className="border-2 border-[#424141] px-2 rounded-3xl"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
