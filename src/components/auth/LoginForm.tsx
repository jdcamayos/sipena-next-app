import { useFormik } from 'formik'
import { useRouter } from 'next/router'
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
// import useAuth from '../../hooks/useAuth'
// Schemas
import { loginSchema } from '../../schemas'
import { LoginDto, State } from '../../types'

interface Props {
	loading: boolean
	login: (loginDto: LoginDto) => Promise<void>
	state: State
	error: string[]
}

export default function LoginForm(props: Props) {
	const { loading, login, state, error } = props
	// const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: values => {
			login(values)
		},
		validationSchema: loginSchema,
	})

	// React.useEffect(() => {
	// 	if (state.auth.isAuth) {
	// 		router.replace('/')
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [state.auth.isAuth])

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
			<PasswordInput
				fullWidth
				inputOnChange={formik.handleChange}
				inputValue={formik.values.password}
				margin='normal'
				required
			/>
			{!!error.length && <Typography align='center'>{error[0]}</Typography>}
			<AuthButton loading={loading} content='Login' />
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Link component={LinkRouter} href='/forgot-password' variant='body2'>
						<Typography align='center' sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
							Forgot password?
						</Typography>
					</Link>
				</Grid>
				<Grid item xs={12} md={6}>
					<Link component={LinkRouter} href='/register' variant='body2'>
						<Typography align='center' sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
							{"Don't have an account? Register"}
						</Typography>
					</Link>
				</Grid>
			</Grid>
		</Box>
	)
}
