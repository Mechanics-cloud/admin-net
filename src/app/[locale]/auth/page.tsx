'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { CHECK_AUTH_QUERY } from '@/src/apolloClient/request'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data, error }] = useMutation(CHECK_AUTH_QUERY)
  const router = useRouter()

  console.log('data', data)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const { data } = await login({ variables: { email, password } })

      if (data.loginAdmin.logged) {
        // Кодируем в base64 и сохраняем
        const authData = btoa(`${email}:${password}`)
        sessionStorage.setItem('authData', authData)
        console.log('page: router.push(/adminPanel)')
        router.push('/')
      }
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <div className={'flex justify-center h-screen'}>
      <form
        onSubmit={handleSubmit}
        className={'flex flex-col justify-center text-center w-[300px]'}
      >
        <div className={'flex gap-6 justify-between border-b'}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={'flex gap-6 justify-between border-b'}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={'border mt-6'}>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
