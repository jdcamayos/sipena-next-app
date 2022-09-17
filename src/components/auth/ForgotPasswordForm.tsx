import { useFormik } from 'formik'
import * as React from 'react'
import LinkRouter from 'next/link'
// MUI Styles
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// Components
import AuthButton from './AuthButton'
// Hooks
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { forgotPasswordSchema } from '../../schemas/forgot-password.schema'

interface Props {
	loading: boolean
	forgotPassword: (email: string) => Promise<void>
}

export default function ForgotPasswordForm(props: Props) {
	const { loading, forgotPassword } = props
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: async values => {
			await forgotPassword(values.email)
			router.replace('/login')
		},
		validationSchema: forgotPasswordSchema,
	})
	return (
		<Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
			<TextField
				autoComplete='email'
				autoFocus
				fullWidth
				label='Email Address'
				margin='normal'
				name='email'
				onChange={formik.handleChange}
				required
				type='email'
				value={formik.values.email}
				error={!!formik.errors.email}
				helperText={formik.errors.email}
			/>
			<AuthButton loading={loading} content='Recovery password' />
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
