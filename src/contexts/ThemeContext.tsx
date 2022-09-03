import * as React from 'react'
import { createTheme, ThemeProvider as MUIThemeProvider, responsiveFontSizes } from '@mui/material'

export const ThemeContext = React.createContext({ toggleThemeMode: () => {} })

interface Props {
  children: React.ReactNode
}

export default function ThemeProvider(props: Props) {
	const [mode, setMode] = React.useState<'light' | 'dark'>('light')

	React.useEffect(() => {
		const mode = window.localStorage.getItem('theme_mode')
		if (typeof(mode) === 'string') {
			if (mode === 'light' || mode === 'dark') {
				setMode(mode)
			}
		}
	}, [])

	const theme = React.useMemo(
		() =>
			responsiveFontSizes(
				createTheme({
					palette: {
						mode,
						primary: {
							main: '#f2652e',
							dark: '#f2652e',
							light: '#f2652e'
						},
						// warning: {
						// 	main: '#',
						// },
						// error: {
						// 	main: '#',
						// },
						// success: {
						// 	main: '#',
						// },
						// text: {
						// 	main: '#',
						// },
						// background: {
						// 	main: '#',
						// },
					},
					typography: {
						// fontFamily: ''
						// htmlFontSize: 18,
					},
				}),
				{
					factor: 2,
				}
			),
		[mode]
	)

	const themeMode = React.useMemo(
		() => ({
			toggleThemeMode: () => {
				setMode(prev => {
					const themeMode = prev === 'light' ? 'dark' : 'light'
					window.localStorage.setItem('theme_mode', themeMode)
					return themeMode
				})
			},
		}),
		[]
	)

	return (
		<ThemeContext.Provider value={themeMode}>
			<MUIThemeProvider theme={theme}>
        {props.children}
      </MUIThemeProvider>
		</ThemeContext.Provider>
	)
}
