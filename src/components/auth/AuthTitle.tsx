import * as React from 'react'
// MUI Styles
import Typography from '@mui/material/Typography'

interface Props {
	title: string
}

export default function AuthTitle(props: Props) {
	const { title } = props
	return (
		<Typography component='h1' variant='h5'>
			{title ? title : ''}
		</Typography>
	)
}
