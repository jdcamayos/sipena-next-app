import * as React from 'react'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

interface Props extends FormControlProps {
  inputValue?: string
  inputOnChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInput(props: Props) {
  const { inputValue, inputOnChange, ...rest  } = props
  const [showPassword, setShowPassword] = React.useState(false)
  const id = React.useId()

  const handleClickShowPassword = () => {
		setShowPassword(prev => !prev)
	}

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	return (
		<FormControl { ...rest }>
			<InputLabel htmlFor={id}>Password</InputLabel>
			<OutlinedInput
				id={id}
				type={showPassword ? 'text' : 'password'}
        name="password"
				label='Password'
        autoComplete='current-password'
        value={inputValue}
        onChange={inputOnChange}
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
		</FormControl>
	)
}
