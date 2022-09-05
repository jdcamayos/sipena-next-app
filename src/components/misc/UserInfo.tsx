import * as React from 'react'
// MUI Styles
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// Components
import PasswordForm from '../forms/PasswordForm'
// Types
import { User } from '../../types'

interface Props {
	user: User
}

export default function UserInfo(props: Props) {
	const { user } = props
	return (
		<Grid item xs={12} md={6} component='form' container spacing={2} sx={{ paddingBottom: 2 }}>
			<Grid item xs={12}>
				<Typography variant='h5' align='center'>
					Account info
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<TextField value={user.email} label='Email' name='email' type='text' fullWidth disabled />
			</Grid>
			<Grid item xs={12}>
				<TextField value={user.role} label='Role' name='role' type='text' fullWidth disabled />
			</Grid>
			<Grid item xs={12}>
				<PasswordForm />
			</Grid>
		</Grid>
	)
}
