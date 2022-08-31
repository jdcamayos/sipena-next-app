import * as React from 'react'
import Image from 'next/image'
// MUI Styles
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import * as colors from '@mui/material/colors'
// Components
import Copyright from '../misc/Copyright'

interface Props {
	children: React.ReactNode
}

export default function AuthLayout(props: Props) {
	return (
		<Container component='main' maxWidth='xs' sx={{ paddingTop: 6 }}>
			<CssBaseline />
			<Box
				sx={{
					backgroundColor: theme =>
						theme.palette.mode === 'light' ? colors.grey[100] : theme.palette.grey[800],
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: 4,
				}}
				component={Paper}
				elevation={6}
			>
				<Box
					sx={{ height: 70, width: 300, position: 'relative' }}
				>
					<Image src='/assets/logoColorHorizontal.png' alt='Logo Sipena' layout='fill' objectFit='contain' />
				</Box>
				{props.children}
			</Box>
			<Copyright sx={{ mt: 5 }} />
		</Container>
	)
}
