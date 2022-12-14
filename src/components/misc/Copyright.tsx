// MUI Styles
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// interface Props {}

export default function Copyright(props: any) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' sx={{ my: 3 }} { ...props }>
			{'Copyright © '}
			<Link color='inherit' href='https://sipenalogistics.com/'>
				Sipena Logistics Pty Ltd
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}
