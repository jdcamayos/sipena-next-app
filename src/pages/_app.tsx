import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/misc/Layout'
import AppProvider from '../contexts/AppContext'
import ThemeProvider from '../contexts/ThemeContext'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Sipena Orders App</title>
				<meta name='description' content='Sipena Orders App' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ThemeProvider>
				<AppProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AppProvider>
			</ThemeProvider>
		</>
	)
}
