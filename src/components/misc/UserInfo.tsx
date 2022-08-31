import { User } from '../../types'
import * as React from 'react'
// MUI Styles
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type UserInfoProps = {
	user: User
}

export default function UserInfo(props: UserInfoProps) {
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
		</Grid>
	)
}
