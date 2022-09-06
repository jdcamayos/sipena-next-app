// import { ChangePasswordCredentials } from '../../types'
// import { changePasswordSchema } from '../../schemas'
// import { Link as LinkRouter } from 'react-router-dom'
import LinkRouter from 'next/link'
import { useFormik } from 'formik'
import * as React from 'react'
import AuthButton from './AuthButton'
// MUI Styles
import Box from '@mui/material/Box'
// import Checkbox from '@mui/material/Checkbox'
// import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import PasswordInput from '../misc/PasswordInput'
import { useRouter } from 'next/router'

type Props = {
	loading: boolean
	changePassword: (password: string) => void
}

export default function ChangePasswordForm(props: Props) {
	const { loading, changePassword } = props
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			password: '',
		},
		onSubmit: async values => {
			await changePassword(values.password)
			router.replace('/')
		},
		// validationSchema: recoveryPasswordSchema,
	})

	return (
		<Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
			<PasswordInput
				fullWidth
				inputOnChange={formik.handleChange}
				inputValue={formik.values.password}
				margin='normal'
				required
			/>
			<AuthButton loading={loading} content='Change Password' />
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Link component={LinkRouter} href='/login' variant='body2'>
						<Typography align='center' sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
							Back to login
						</Typography>
					</Link>
				</Grid>
			</Grid>
		</Box>
	)
}
