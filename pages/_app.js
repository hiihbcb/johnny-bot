import '../styles/globals.scss'
import { Header } from '../lib/components'
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Header/>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
