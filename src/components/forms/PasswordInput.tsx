import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
// Others
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useProfile from '../../hooks/useProfile'

interface Props {
	handleClose: () => void
}

export default function PasswordInput(props: Props) {
	const { handleClose } = props
  const { changeMyPassword } = useProfile()
	const [showPassword, setShowPassword] = React.useState(false)
	const id = React.useId()

	const schema = Yup.object().shape({
		password: Yup.string().required('This field is required'),
		repeatPassword: Yup.string().when('password', {
			is: (val: string | any[]) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
		}),
	})

	const formik = useFormik({
		initialValues: {
			password: '',
			repeatPassword: '',
		},
		validationSchema: schema,
		onSubmit: values => {
      changeMyPassword({ password: values.password })
      handleClose()
		},
	})


	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev)
	}

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	return (
		<Grid container spacing={2} component='form' onSubmit={formik.handleSubmit}>
			<Grid item xs={12}>
				<FormControl sx={{ marginTop: 2 }} fullWidth error={!!formik.errors.password}>
					<InputLabel htmlFor={id + 'password'}>Password</InputLabel>
					<OutlinedInput
						id={id + 'password'}
						type={showPassword ? 'text' : 'password'}
						name='password'
						label='Password'
						autoComplete='current-password'
						value={formik.values.password}
						onChange={formik.handleChange}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
					{!!formik.errors.password && <FormHelperText>{formik.errors.password}</FormHelperText>}
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<FormControl sx={{ marginTop: 2 }} fullWidth error={!!formik.errors.repeatPassword}>
					<InputLabel htmlFor={id + 'repeatPassword'}>Repeat Password</InputLabel>
					<OutlinedInput
						id={id + 'repeatPassword'}
						type={showPassword ? 'text' : 'password'}
						name='repeatPassword'
						label='Repeat Password'
						autoComplete='current-password'
						value={formik.values.repeatPassword}
						onChange={formik.handleChange}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
          {!!formik.errors.repeatPassword && <FormHelperText>{formik.errors.repeatPassword}</FormHelperText>}
				</FormControl>
			</Grid>
			<Grid item xs={12} sx={{ display: 'flex', gap: 3, justifyContent: 'flex-end' }}>
				<Button onClick={handleClose}>Go back</Button>
				<Button type='submit' variant='contained'>
					Change password
				</Button>
			</Grid>
		</Grid>
	)
}
