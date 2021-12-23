import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'

const cookie = new Cookie()

const Auth: React.FC = () => {
  const router = useRouter() // 関数内でページ遷移させる
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/jwt/create`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status === 200) {
        const options = { path: '/' }
        cookie.set('access_token', res.data.access, options)
        router.push('/')
      }
    } catch {
      setError('Login Error')
    }
  }

  const authUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      login()
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}/register`,
          { username: username, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (res.status === 201) login()
      } catch {
        setError('Register Error')
      }
    }
  }

  return (
    <>
      <p className="text-3xl text-center">{isLogin ? 'Login' : 'Sign up'}</p>
      <form onSubmit={authUser} className="mt-8 space-y-3">
        <div>
          <input
            type="text"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <p
          data-testid="mode-change"
          onClick={() => {
            setIsLogin(!isLogin)
            setError('')
          }}
          className="cursor-pointer flex items-center justify-center flex-col font-medium hover:text-indigo-500 "
        >
          change mode ?
        </p>

        <div className="flex items-center justify-center flex-col">
          <button
            disabled={!username || !password}
            type="submit"
            className="disabled:opacity-40 py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            {isLogin ? 'Login with JWT' : 'Create new user'}
          </button>
        </div>
      </form>
      {error && <p className="mt-5 text-red-600">{error}</p>}
    </>
  )
}

export default Auth
