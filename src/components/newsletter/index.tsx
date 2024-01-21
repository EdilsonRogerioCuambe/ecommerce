'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      console.log('Email cadastrado:', email)
      toast.success('E-mail cadastrado com sucesso!')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } else {
      toast.error('Digite um e-mail válido')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-[#414242] text-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-extrabold text-center sm:text-4xl">
        Receba nossas ofertas por e-mail
      </h2>
      <p className="mt-3 text-md sm:text-xl text-center sm:mt-4">
        Cadastre-se e receba nossas novidades e promoções em seu e-mail
      </p>
      <div className="mt-5 w-full sm:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="flex-1 p-2 rounded-md text-black focus:outline-none focus:ring-0 focus:border-none shadow-md transition-all"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            className={`px-4 py-2 text-white hover:bg-black/50 bg-black font-medium rounded-md shadow-sm transition-all duration-300 ease-in-out`}
            onClick={handleSubmit}
          >
            {submitted ? 'Cadastrado!' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  )
}
