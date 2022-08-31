import * as React from 'react'
import { createTheme, ThemeProvider as MUIThemeProvider, responsiveFontSizes } from '@mui/material'

const ThemeContext = React.createContext({ toggleThemeMode: () => {} })

interface Props {
  children: React.ReactNode
}

export default function ThemeProvider(props: Props) {
	const [mode, setMode] = React.useState<'light' | 'dark'>('light')
	const theme = React.useMemo(
		() =>
			responsiveFontSizes(
				createTheme({
					palette: {
						mode,
						// primary: {
						// 	main: '#',
						// },
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
						htmlFontSize: 20,
					},
				}),
				{
					factor: 4,
				}
			),
		[mode]
	)

	const themeMode = React.useMemo(
		() => ({
			toggleThemeMode: () => {
				setMode(prev => (prev === 'light' ? 'dark' : 'light'))
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
