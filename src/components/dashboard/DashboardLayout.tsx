import * as React from 'react'
// MUI Styles
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
// Components
import Copyright from '../misc/Copyright'
import Header from './Header'

interface Props {
	children: React.ReactNode
}

export default function DashboardLayout(props: Props) {
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Header />
				<Box
					component='main'
					sx={{
						backgroundColor: theme =>
							theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
						flexGrow: 1,
						minHeight: '100vh',
						overflow: 'auto',
					}}
				>
					<Toolbar />
					<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
						{props.children}
					</Container>
					<Copyright />
				</Box>
			</Box>
		</>
	)
}
