import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// Others
import { CreateCustomer } from '../../types'
import { useFormik } from 'formik'
import useCustomer from '../../hooks/useCustomer'

type Props = {
	initialValues?: CreateCustomer
	isForm?: boolean
	isUpdate?: boolean
	handleClose?: () => void
}

export default function CustomerInfo(props: Props) {
  const { initialValues, isForm, isUpdate, handleClose } = props
	const { createCustomer } = useCustomer()

	const formik = useFormik({
		initialValues: initialValues
			? initialValues
			: {
				companyName: '',
				streetAddress: '',
				city: '',
				state: '',
				postalCode: '',
				phone: '',
			},
		onSubmit: async values => {
      try {
        // console.log(values)
        await createCustomer(values)
        if (handleClose) {
          handleClose()
        }
      } catch (error) {
        console.log(error)
      }
		},
	})

	return (
		<Grid
			item
			xs={12}
			component='form'
			onSubmit={formik.handleSubmit}
			container
			spacing={2}
			sx={{ py: 2 }}
		>
			{!isForm && (
				<Grid item xs={12}>
					<Typography variant='h5' align='center'>
						Customer info
					</Typography>
				</Grid>
			)}
			<Grid item xs={12} md={6}>
				<TextField
					label='Company Name'
					name='companyName'
					value={formik.values.companyName}
					type='text'
					onChange={formik.handleChange}
					fullWidth
					disabled={!isForm}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label='Street Address'
					name='streetAddress'
					value={formik.values.streetAddress}
					type='text'
					onChange={formik.handleChange}
					fullWidth
					disabled={!isForm}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label='City'
					name='city'
					value={formik.values.city}
					type='text'
					onChange={formik.handleChange}
					fullWidth
					disabled={!isForm}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label='State'
					name='state'
					value={formik.values.state}
					type='text'
					onChange={formik.handleChange}
					fullWidth
					disabled={!isForm}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label='Postal Code'
					name='postalCode'
					value={formik.values.postalCode}
					type='text'
					onChange={formik.handleChange}
					fullWidth
					disabled={!isForm}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label='Phone'
					name='phone'
					value={formik.values.phone}
					type='text'
					onChange={formik.handleChange}
					fullWidth
					disabled={!isForm}
				/>
			</Grid>
			{isForm && (
				<Grid item xs={12} sx={{ display: 'flex', gap: 3, justifyContent: 'flex-end' }}>
					<Button onClick={handleClose}>Go back</Button>
					<Button type='submit' variant='contained'>
						{isUpdate ? 'Update' : 'Create'}
					</Button>
				</Grid>
			)}
		</Grid>
	)
}
