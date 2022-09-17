import { useFormik } from 'formik'
import * as React from 'react'
import LinkRouter from 'next/link'
// MUI Styles
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
// Components
import AuthButton from './AuthButton'
import PasswordInput from '../misc/PasswordInput'
// Hooks
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { recoveryPasswordSchema } from '../../schemas/recovery-password.schema'
import { RecoveryPasswordDto } from '../../types'

interface Props {
	recoveryToken: string
	recoveryPassword: (recoveryPasswordDto: RecoveryPasswordDto, token: string) => Promise<void>
	loading: boolean
}

export default function RecoveryPasswordForm(props: Props) {
	const { loading, recoveryPassword, recoveryToken } = props
	// const router = useRouter()
	const formik = useFormik({
		initialValues: {
			password: '',
		},
		onSubmit: async values => {
			// await recoveryPassword(values, recoveryToken)
			recoveryPassword(values, recoveryToken)
			// router.replace('/')
		},
		validationSchema: recoveryPasswordSchema,
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
