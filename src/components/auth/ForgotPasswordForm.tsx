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

interface Props {}

export default function ForgotPasswordForm(props: Props) {
	const { loading, forgotPassword } = useAuth()
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: values => {
			console.log(values)
		},
		// validationSchema: forgotPasswordSchema,
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
