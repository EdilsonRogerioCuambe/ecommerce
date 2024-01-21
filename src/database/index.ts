import { request, gql } from 'graphql-request'

const DATABASE_URL =
  'https://api-sa-east-1.hygraph.com/v2/clrmshxjg0pua01w32xcfm0qx/master'

if (!DATABASE_URL) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local',
  )
}

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

interface Banner {
  id: string
  nome: string
  slug: string
  imagem: {
    url: string
  }
}

export const getProdutos = async () => {
  const query = gql`
    query Produtos {
      produtos {
        nome
        preco
        promocao
        publishedAt
        slug
        tamanhos
        updatedAt
        variantes {
          url
        }
        id
        imagem {
          url
        }
        descricao
        createdAt
        categorias {
          nome
          slug
        }
      }
    }
  `
  try {
    const data = await request<{ produtos: Produto[] }>(DATABASE_URL, query)

    return data.produtos
  } catch (err) {
    console.log('[GET PRODUTOS ERROR]', err)
  }
}

export const getProduto = async (slug: string) => {
  const query = gql`
    query Produto($slug: String!) {
      produto(where: { slug: $slug }) {
        nome
        preco
        promocao
        publishedAt
        slug
        tamanhos
        updatedAt
        variantes {
          url
        }
        id
        imagem {
          url
        }
        descricao
        createdAt
        categorias {
          nome
          slug
        }
      }
    }
  `
  try {
    const data = await request<{ produto: Produto }>(DATABASE_URL, query, {
      slug,
    })

    return data.produto
  } catch (err) {
    console.log('[GET PRODUTO ERROR]', err)
  }
}

export const getCategorias = async () => {
  const query = gql`
    query Categorias {
      categorias {
        createdAt
        id
        nome
        slug
        updatedAt
      }
    }
  `
  try {
    const data = await request<{ categorias: Categoria[] }>(DATABASE_URL, query)

    return data.categorias
  } catch (err) {
    console.log('[GET CATEGORIAS ERROR]', err)
  }
}

export const getUsuario = async (email: string) => {
  const query = gql`
    query Usuarios {
      usuario(where: { email: "${email}" }) {
        id
        nome
        email
        avatar
        carrinho {
          id
          nome
          descricao
          categorias {
            nome
            id
            slug
          }
          preco
          promocao
          publishedAt
          tamanhos
          variantes {
            url
          }
          slug
          updatedAt
          imagem {
            url
          }
          createdAt
        }
      }
    }
  `
  try {
    const data = await request<{ usuario: Usuario }>(DATABASE_URL, query)

    return data.usuario
  } catch (err) {
    console.log('[GET USUARIO ERROR]', err)
  }
}

export const criarUsuario = async (
  email: string,
  nome: string,
  avatar: string,
) => {
  const mutation = gql`
    mutation CriarUsuario($email: String!, $nome: String!, $avatar: String!) {
      createUsuario(data: { email: $email, nome: $nome, avatar: $avatar }) {
        id
        nome
        email
        avatar
      }
      publishUsuario(where: { email: $email }, to: PUBLISHED) {
        id
        nome
        email
        avatar
      }
    }
  `
  try {
    const data = await request<{ createUsuario: Usuario }>(
      DATABASE_URL,
      mutation,
      {
        email,
        nome,
        avatar,
      },
    )

    return data.createUsuario
  } catch (err) {
    console.log('[CREATE USUARIO ERROR]', err)
  }
}

export const getBanner = async ({ slug }: { slug: string }) => {
  const query = gql`
    query Banner($slug: String!) {
      banner(where: { slug: $slug }) {
        id
        nome
        slug
        imagem {
          url
        }
      }
    }
  `
  try {
    const data = await request<{ banner: Banner }>(DATABASE_URL, query, {
      slug,
    })

    return data.banner
  } catch (err) {
    console.log('[GET BANNER ERROR]', err)
  }
}

export const addProdutoCarrinho = async (email: string, produtoId: string) => {
  const mutation = gql`
    mutation AddProdutoCarrinho($email: String!, $produtoId: ID!) {
      updateUsuario(
        where: { email: $email }
        data: { carrinho: { connect: { where: { id: $produtoId } } } }
      ) {
        id
        nome
        email
        avatar
      }
      publishUsuario(where: { email: $email }, to: PUBLISHED) {
        id
        nome
        email
        avatar
      }
    }
  `
  try {
    const data = await request<{ updateUsuario: Usuario }>(
      DATABASE_URL,
      mutation,
      {
        email,
        produtoId,
      },
    )

    return data.updateUsuario
  } catch (err) {
    console.log('[ADD PRODUTO CARRINHO ERROR]', err)
  }
}

export const addProdutoComTamanho = async (
  email: string,
  produtoId: string,
  tamanho: string,
) => {
  const mutation = gql`
    mutation AddProdutoComTamanho(
      $email: String!
      $produtoId: ID!
      $tamanho: String!
    ) {
      updateUsuario(
        where: { email: $email }
        data: {
          carrinho: {
            connect: { where: { id: $produtoId } }
            data: { tamanhos: { set: [$tamanho] } }
          }
        }
      ) {
        id
        nome
        email
        avatar
      }
      publishUsuario(where: { email: $email }, to: PUBLISHED) {
        id
        nome
        email
        avatar
      }
    }
  `
  try {
    const data = await request<{ updateUsuario: Usuario }>(
      DATABASE_URL,
      mutation,
      {
        email,
        produtoId,
        tamanho,
      },
    )

    return data.updateUsuario
  } catch (err) {
    console.log('[ADD PRODUTO COM TAMANHO ERROR]', err)
  }
}

export const getCarrinhoUsuario = async (email: string) => {
  const query = gql`
    query Usuario {
      usuario(where: { email: "${email}" }, stage: PUBLISHED) {
        carrinho {
          id
          nome
          descricao
          categorias {
            nome
            id
            slug
          }
          preco
          promocao
          publishedAt
          tamanhos
          variantes {
            url
          }
          slug
          updatedAt
          imagem {
            url
          }
        }
      }
    }
  `
  try {
    const data = await request<{ usuario: Usuario }>(DATABASE_URL, query, {
      email,
    })

    return data.usuario.carrinho
  } catch (err) {
    console.log('[GET CARRINHO USUARIO ERROR]', err)
  }
}

export const removeProdutoCarrinho = async (
  email: string,
  produtoId: string,
) => {
  const mutation = gql`
    mutation RemoveProdutoCarrinho($email: String!, $produtoId: ID!) {
      updateUsuario(
        where: { email: $email }
        data: { carrinho: { disconnect: { id: $produtoId } } }
      ) {
        id
        nome
        email
        avatar
        carrinho {
          tamanhos
          slug
          promocao
          preco
          nome
          publishedAt
          updatedAt
          id
          imagem {
            url
          }
          descricao
          categorias {
            id
            nome
            slug
          }
          createdAt
        }
      }
      publishUsuario(where: { email: $email }, to: PUBLISHED) {
        id
        nome
        email
        avatar
        carrinho {
          tamanhos
          slug
          promocao
          preco
          nome
          publishedAt
          updatedAt
          id
          imagem {
            url
          }
          descricao
          categorias {
            id
            nome
            slug
          }
          createdAt
        }
      }
    }
  `
  try {
    const data = await request<{ updateUsuario: Usuario }>(
      DATABASE_URL,
      mutation,
      {
        email,
        produtoId,
      },
    )

    return data.updateUsuario
  } catch (err) {
    console.log('[REMOVE PRODUTO CARRINHO ERROR]', err)
  }
}

export const getProdutosPorCategoria = async (slug: string) => {
  const query = gql`
    query Produtos {
      produtos(where: {categorias_some: {slug: "${slug}"}}) {
        nome
        preco
        promocao
        publishedAt
        slug
        tamanhos
        updatedAt
        variantes {
          url
        }
        id
        imagem {
          url
        }
        descricao
        createdAt
        categorias {
          nome
          slug
        }
      }
    }
  `
  try {
    const data = await request<{ produtos: Produto[] }>(DATABASE_URL, query, {
      slug,
    })

    return data
  } catch (err) {
    console.log('[GET PRODUTOS POR CATEGORIA ERROR]', err)
  }
}
