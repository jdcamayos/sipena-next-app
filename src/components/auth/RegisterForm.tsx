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
import PasswordInput from '../misc/PasswordInput'
// Hooks
import useAuth from '../../hooks/useAuth'

interface Props {}

export default function RegisterForm(props: Props) {
	const { loading } = useAuth()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		onSubmit: values => {
			console.log(values)
		},
		// validationSchema: signUpSchema,
	})

	return (
		<Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
			<Grid container>
				<Grid item xs={12} sm={6}>
				</Grid>
				<Grid item xs={12}>
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
				</Grid>
				<Grid item xs={12}>
					<PasswordInput
						fullWidth
						inputOnChange={formik.handleChange}
						inputValue={formik.values.password}
						margin='normal'
						required
					/>
				</Grid>
			</Grid>
			<AuthButton content='Register' loading={loading} />
			<Grid container justifyContent='flex-end'>
				<Grid item xs={12}>
					<Link component={LinkRouter} href='/login' variant='body2'>
						<Typography align='center' sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
							Already have an account? Login
						</Typography>
					</Link>
				</Grid>
			</Grid>
		</Box>
	)
}
