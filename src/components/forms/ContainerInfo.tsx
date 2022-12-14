import { useFormik } from 'formik'
import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
// Hooks
import useNewOrder from '../../hooks/useNewOrder'
// Types
import { Container, CreateContainerDto, CreateContainerItem } from '../../types'
import { Input, InputAdornment, OutlinedInput } from '@mui/material'
import { containerSchema } from '../../schemas/container.schema'

interface Props {
	initialValues?: CreateContainerItem | Container
	isForm?: boolean
	isUpdate?: boolean
	handleClose?: () => void
}

export default function ContainerInfo(props: Props) {
	const { initialValues, isUpdate, handleClose } = props
	const { addContainer, editContainer } = useNewOrder()

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
		validationSchema: containerSchema,
		validateOnChange: false,
		onSubmit: async (values: CreateContainerDto) => {
			if (isUpdate && initialValues) {
				if (typeof initialValues.id === 'number') editContainer({ id: initialValues.id, ...values })
			} else {
				addContainer(values)
			}
			handleClose && handleClose()
		},
	})

	return (
		<Grid container spacing={2} sx={{ py: 2 }} component='form' onSubmit={formik.handleSubmit}>
			<Grid item xs={12} justifyContent='center'>
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
					error={!formik.errors.contain}
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
					label='Carton Count'
					type='number'
					error={!!formik.errors.productQuantity}
					helperText={formik.errors.productQuantity}
					required
					variant='standard'
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				{/* <FormControl variant='standard' label='Weight'> */}
				<TextField
					name='productWeight'
					value={formik.values.productWeight}
					onChange={formik.handleChange}
					fullWidth
					label='Weight'
					type='number'
					error={!!formik.errors.productWeight}
					helperText={formik.errors.productWeight}
					required
					variant='standard'
					InputLabelProps={{
						shrink: true,
					}}
					InputProps={{
						endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
					}}
				/>
				{/* </FormControl> */}
			</Grid>
			<Grid item xs={6}>
				<FormControlLabel
					control={
						<Checkbox name='forkliftOperator' checked={formik.values.forkliftOperator} onChange={formik.handleChange} />
					}
					label='Forklift Operator'
				/>
			</Grid>
			<Grid item xs={6}>
				<FormControlLabel
					control={<Checkbox name='stretchWrap' checked={formik.values.stretchWrap} onChange={formik.handleChange} />}
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
