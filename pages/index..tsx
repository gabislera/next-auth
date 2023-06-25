import { FormEvent, useContext, useState } from "react"
import style from  '../styles/home.module.css'
import { AuthContext } from "../context/AuthContext"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { redirect } from "next/dist/server/api-utils"

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)
 
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password,
    }

    await signIn(data)
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className={style.button} type="submit">Enviar</button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)
  // console.log(ctx.req.cookies['nextauth.token'])

  if (cookies['nextauth.token']) {
    return {
    redirect: {
      destination: '/dashboard',
      permanent: false
    }
  }
}

  return {
    props: {}
  }
}