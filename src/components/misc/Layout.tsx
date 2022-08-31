import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import * as colors from '@mui/material/colors'

interface Props {
	children: React.ReactNode
}

export default function Layout(props: Props) {
	return (
		<Box
			sx={{
        minHeight: '100vh',
				backgroundColor:
          theme => (
            theme.palette.mode === 'light'
            ? colors.grey[200]
            : colors.grey[800]
          ),
			}}
		>
			<CssBaseline />
			{props.children}
		</Box>
	)
}
