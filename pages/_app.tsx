import type { AppProps } from 'next/app'
import Layout from '~/layouts/default'
import { SessionProvider } from 'next-auth/react'
import { Inter, League_Spartan } from '@next/font/google'
import '~/css/globals.css'
import '~/css/index.css'

const inter = Inter({
  subsets: ['latin'],
})
const leagueSpartan = League_Spartan({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <style jsx global>{`
        body {
          font-family: ${inter.style.fontFamily};
        }
        .spartan {
          font-family: ${leagueSpartan.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
