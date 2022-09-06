import type { AppContext, AppProps } from 'next/app'
import * as React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Layout from '../components/misc/Layout'
import AppProvider from '../contexts/AppContext'
import ThemeProvider from '../contexts/ThemeContext'
import { HistoryProvider } from '../contexts/HistoryContext'

// export default function MyApp({ Component, pageProps }: AppProps) {
// 	return (
// 		<>
// 			<Head>
// 				<title>Sipena Orders App</title>
// 				<meta name='description' content='Sipena Orders App' />
// 				<link rel='icon' href='/favicon.ico' />
// 			</Head>
// 			<HistoryProvider>
// 				<ThemeProvider>
// 					<AppProvider>
// 						<Layout>
// 							<Component {...pageProps } />
// 						</Layout>
// 					</AppProvider>
// 				</ThemeProvider>
// 			</HistoryProvider>
// 		</>
// 	)
// }

// MyApp.getInitialProps = async (appContext: AppContext) => {
// 	const appProps = await App.getInitialProps(appContext)
// 	return { ...appProps }
// }

export default class MyApp extends App<{}, {}, { history: string[] }> {
	static async getInitialProps({ Component, ctx }: AppContext) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	state = {
		history: [], // keep history items in state
	}

	componentDidMount() {
		const { asPath } = this.props.router

		// lets add initial route to `history`
		this.setState(prevState => ({ history: [...prevState.history, asPath] }))
	}

	componentDidUpdate() {
		const { history } = this.state
		const { asPath } = this.props.router

		// if current route (`asPath`) does not equal
		// the latest item in the history,
		// it is changed so lets save it
		if (history[history.length - 1] !== asPath) {
			this.setState(prevState => ({ history: [...prevState.history, asPath] }))
		}
	}

	render() {
		const { Component, pageProps } = this.props

		return (
			<>
				<Head>
					<title>Sipena Orders App</title>
					<meta name='description' content='Sipena Orders App' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<HistoryProvider>
					<ThemeProvider>
						<AppProvider>
							<Layout>
								<Component history={this.state.history} {...pageProps} />
							</Layout>
						</AppProvider>
					</ThemeProvider>
				</HistoryProvider>
			</>
		)
	}
}
