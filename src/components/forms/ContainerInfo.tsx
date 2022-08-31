import { useFormik } from 'formik'
import * as React from 'react'
import { Container, CreateContainer, ListItemCreateContainer } from '../../types'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import useCreateOrder from '../../hooks/useCreateOrder'

type Props = {
	initialValues?: ListItemCreateContainer | Container
	isForm?: boolean
	isUpdate?: boolean
	handleClose?: () => void
}

export default function ContainerInfo(props: Props) {
	const { initialValues, isUpdate, handleClose } = props
	const { addContainer, editContainer } = useCreateOrder()

	const formik = useFormik({
		initialValues: initialValues
			? {
					type: initialValues.type,
					contain: initialValues.contain,
					productQuantity: initialValues.productQuantity,
					productWeight: initialValues.productWeight,
					forkliftOperator: initialValues.forkliftOperator,
					stretchWrap: initialValues.stretchWrap,
					additionalInfo: initialValues.additionalInfo,
				}
			: {
					type: '20ft',
					contain: '',
					productQuantity: 0,
					productWeight: 0,
					forkliftOperator: false,
					stretchWrap: false,
					additionalInfo: '',
			  },
		onSubmit: async (values: CreateContainer) => {
			if (isUpdate && initialValues) {
				if(typeof initialValues.id === 'number') editContainer({ id: initialValues.id, ...values })
			} else {
				addContainer(values)
			}
      handleClose && handleClose()
		},
	})

	return (
		<Grid container spacing={2} sx={{ py: 2 }} component='form' onSubmit={formik.handleSubmit}>
			<Grid item xs={12}>
				<FormControl>
					<FormLabel id='container-type-group'>Type</FormLabel>
					<RadioGroup
						row
						aria-labelledby='container-type-group'
						defaultValue='20ft'
						name='type'
						value={formik.values.type}
						onChange={formik.handleChange}
					>
						<FormControlLabel value='20ft' control={<Radio />} label='20 ft' />
						<FormControlLabel value='40ft' control={<Radio />} label='40 ft' />
					</RadioGroup>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label='Contain'
					required
					name='contain'
					value={formik.values.contain}
					onChange={formik.handleChange}
					fullWidth
					multiline
					rows={2}
					placeholder='Coffe, Toys, Tools...'
					variant='standard'
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					name='productQuantity'
					value={formik.values.productQuantity}
					onChange={formik.handleChange}
					fullWidth
					label='Quantity'
					type='number'
					variant='standard'
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					name='productWeight'
					value={formik.values.productWeight}
					onChange={formik.handleChange}
					fullWidth
					label='Weight'
					type='number'
					variant='standard'
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<FormControlLabel control={
					<Checkbox
						name="forkliftOperator"
						checked={formik.values.forkliftOperator}
						onChange={formik.handleChange}
					/>
					}
					label='Forklift Operator'
				/>
			</Grid>
			<Grid item xs={6}>
				<FormControlLabel control={
					<Checkbox
						name="stretchWrap"
						checked={formik.values.stretchWrap}
						onChange={formik.handleChange}
					/>
					}
					label='Strech Wrap'
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					name='additionalInfo'
					value={formik.values.additionalInfo}
					onChange={formik.handleChange}
					label='Additional Info'
					fullWidth
					multiline
					rows={2}
					variant='standard'
				/>
			</Grid>
			<Grid item xs={12} sx={{ display: 'flex', gap: 3, justifyContent: 'flex-end' }}>
				<Button onClick={handleClose}>Go back</Button>
				<Button type='submit' variant='contained'>
					{isUpdate ? 'Update' : 'Create'}
				</Button>
			</Grid>
		</Grid>
	)
}
