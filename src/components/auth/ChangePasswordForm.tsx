// import { ChangePasswordCredentials } from '../../types'
// import { changePasswordSchema } from '../../schemas'
import { Link as LinkRouter } from 'react-router-dom'
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

type Props = {
	loading: boolean
	changePassword: (password: string) => void
}

export default function ChangePasswordForm(props: Props) {
	const { loading, changePassword } = props
	const formik = useFormik({
		initialValues: {
			password: '',
		},
		onSubmit: values => {
			changePassword(values.password)
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
			{/* <FormControlLabel
				control={
					<Checkbox
						name='rememberMe'
						checked={formik.values.rememberMe}
						onChange={formik.handleChange}
						color='primary'
					/>
				}
				label='Remember me'
			/> */}
			<AuthButton loading={loading} content='Change Password' />
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Link component={LinkRouter} to='/login' variant='body2'>
						<Typography align='center' sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
							Back to login
						</Typography>
					</Link>
				</Grid>
			</Grid>
		</Box>
	)
}
