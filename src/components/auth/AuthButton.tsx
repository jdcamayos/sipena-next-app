import * as React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
	loading: boolean
	content: string
}

export default function AuthButton(props: Props) {
	const { content, loading } = props
	return (
		<LoadingButton
			// {...props}
			loading={loading}
			fullWidth
			sx={{ mt: 3, mb: 2 }}
			type='submit'
			variant='contained'
		>
			{content}
		</LoadingButton>
	)
}
