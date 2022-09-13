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
import { useRouter } from 'next/router'
import { registerSchema } from '../../schemas'

interface Props {}

export default function RegisterForm(props: Props) {
	const { loading, register, state, error } = useAuth()
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async values => {
			await register(values)
		},
		validationSchema: registerSchema,
	})

	React.useEffect(() => {
		if (state.auth.isAuth) {
			router.replace('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.auth.isAuth])

	return (
		<Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
			<Grid container>
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
						error={!!formik.errors.email}
						helperText={formik.errors.email}
					/>
				</Grid>
				<Grid item xs={12}>
					<PasswordInput
						fullWidth
						inputOnChange={formik.handleChange}
						inputValue={formik.values.password}
						margin='normal'
						required
						customError={formik.errors.password}
					/>
				</Grid>
				<Grid item xs={12}>
				{!!error.length && <Typography align="center">{error[0]}</Typography>}
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
