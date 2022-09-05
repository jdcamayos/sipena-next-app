import { useFormik } from 'formik'
import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import LoadingButton from '@mui/lab/LoadingButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
// Hooks
import useUsers from '../../hooks/useUsers'
// Types
import { AdminUser, UpdateAdminUserDto } from '../../types'



interface Props {
	initialValues?: AdminUser
	handleClose?: () => void
}

export default function UserInfo(props: Props) {
	const { initialValues, handleClose } = props
	const { updateUser, loading } = useUsers()

	const formik = useFormik({
		initialValues: initialValues
			? initialValues
			: {
				email: '',
				role: 'customer',
				blocked: false,
			},
		onSubmit: async (values: UpdateAdminUserDto) => {
			if (initialValues) {
				await updateUser(values)
				handleClose && handleClose()
			}
		},
	})
	return (
		<Grid container spacing={2} sx={{ py: 2 }} component="form" onSubmit={formik.handleSubmit}>
			<Grid item xs={12}>
				<TextField
					label='Email'
					name='email'
					value={formik.values.email}
					type='text'
					onChange={formik.handleChange}
					fullWidth
					disabled
				/>
			</Grid>
			<Grid item xs={12}>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Role</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
            name="role"
						value={formik.values.role}
						label='Age'
						onChange={formik.handleChange}
					>
						<MenuItem value="customer">customer</MenuItem>
						<MenuItem value="worker">worker</MenuItem>
						<MenuItem value="admin">admin</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
        <FormControlLabel
          label="Is blocked?"
          // value={formik.values.blocked}
          name="blocked"
          control={
						<Checkbox
							onChange={formik.handleChange}
              checked={formik.values.blocked}
            />
          }
        />
				<Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button onClick={handleClose} disabled={loading}>Go back</Button>
					<LoadingButton sx={{ marginLeft: 3 }} variant="contained" loading={loading} type="submit">Update</LoadingButton>
				</Grid>
			</Grid>
		</Grid>
	)
}