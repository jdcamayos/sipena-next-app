import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from '../../contexts/ThemeContext'
import { useTheme } from '@mui/material/styles'

export default function ThemeButton() {
	const { toggleColorMode } = React.useContext(ColorModeContext)
	const theme = useTheme()
	return (
		<MenuItem onClick={toggleColorMode}>
			<Typography
				textAlign='center'
				component='div'
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				width='100%'
			>
				{theme.palette.mode === 'dark' ? (
					<>
						{'Dark mode '}
						<Brightness4Icon sx={{ marginLeft: 0.8 }} />
					</>
				) : (
					<>
						{'Light mode '}
						<Brightness7Icon sx={{ marginLeft: 0.8 }} />
					</>
				)}
			</Typography>
		</MenuItem>
	)
}
