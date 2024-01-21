'use client'

import React, { createContext, useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

import {
  addProdutoCarrinho,
  removeProdutoCarrinho,
  getCarrinhoUsuario,
  getUsuario,
} from '@/database'
import { toast } from 'react-toastify'

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

interface Usuario {
  id: string
  nome: string
  email: string
  avatar: string
  carrinho: Produto[]
}

interface CarrinhoContextData {
  carrinho: Produto[]
  addCarrinho: (email: string, produtoId: string) => Promise<void>
  removeCarrinho: (email: string, produtoId: string) => Promise<void>
  usuario: Usuario | null
}

export const CarrinhoContext = createContext<CarrinhoContextData>(
  {} as CarrinhoContextData,
)

interface CarrinhoProviderProps {
  children: React.ReactNode
}

export const CarrinhoProvider = (props: CarrinhoProviderProps) => {
  const { user } = useUser()
  const [carrinho, setCarrinho] = useState<Produto[]>([])
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const email = user?.emailAddresses[0].emailAddress

  useEffect(() => {
    async function loadCarrinhoUsuario() {
      if (email) {
        const usuario = await getCarrinhoUsuario(email)

        if (usuario) {
          setCarrinho(usuario)
        }
      }
    }
    loadCarrinhoUsuario()
  }, [email])

  async function addCarrinho(email: string, produtoId: string) {
    await addProdutoCarrinho(email, produtoId)
    const usuario = await getUsuario(email)

    if (usuario) {
      setCarrinho(usuario.carrinho)
      toast.success('Produto adicionado ao carrinho!')
      setUsuario(usuario)
    }
  }

  async function removeCarrinho(email: string, produtoId: string) {
    await removeProdutoCarrinho(email, produtoId)
    const usuario = await getUsuario(email)

    if (usuario) {
      setCarrinho(usuario.carrinho)
      toast.success('Produto removido do carrinho!')
      setUsuario(usuario)
    }
  }

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, addCarrinho, removeCarrinho, usuario }}
    >
      {props.children}
    </CarrinhoContext.Provider>
  )
}
