import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const { user } = useUser()

  return (
    <div>
      <h1>Hello world!</h1>

      <a href="/api/auth/logout">aaaaaaaaaaa</a>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()
