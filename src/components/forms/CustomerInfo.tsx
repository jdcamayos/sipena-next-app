import { useFormik } from 'formik'
import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// Icons
import EditIcon from '@mui/icons-material/Edit'
// Types
import { CreateCustomerDto } from '../../types'
// Hooks
import useProfile from '../../hooks/useProfile'
// Components
import CustomerForm from './CustomerForm'

interface Props {
	isForm?: boolean
	isUpdate?: boolean
	handleClose?: () => void
}

export default function CustomerInfo(props: Props) {
	const { isForm, isUpdate, handleClose } = props
	const { customer, user, createCustomer, updateCustomer } = useProfile()
	const [initialValues, setInitialValues] = React.useState({
		userId: user?.id || '',
		companyName: '',
		streetAddress: '',
		city: '',
		state: '',
		postalCode: '',
		phone: '',
	})

	React.useEffect(() => {
		if (customer) {
			setInitialValues({
				userId: customer.userId,
				companyName: customer.companyName,
				streetAddress: customer.streetAddress,
				city: customer.city,
				state: customer.state,
				postalCode: customer.postalCode,
				phone: customer.phone,
			})
		}
	}, [customer])

	const formik = useFormik({
		initialValues,
		onSubmit: async values => {
			if (!handleClose) {
				return
			}
			if (isUpdate) {
				await updateCustomer(values)
			} else {
				await createCustomer(values)
			}
			handleClose()
		},
		enableReinitialize: true
	})

	return (
		<Grid item container spacing={2} sx={{ py: 2 }} xs={12} component='form' onSubmit={formik.handleSubmit}>
			{!isForm && (
				<Grid
					item
					xs={12}
					sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<Typography variant='h5' align='center'>
						Customer info
					</Typography>
					{!isForm && <CustomerForm isUpdate={true} />}
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
