import React from 'react'
// MUI Styles
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
// import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'

export default function ContainerInput() {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const formik = useFormik({
		initialValues: {
			type: '20ft',
			contain: '',
			productQuantity: 0,
			productWeight: 0,
			forkliftOperator: false,
			stretchWrap: false,
			additionalInfo: '',
		},
		onSubmit: values => {
			console.log(values)
		},
	})
	return (
		<>
			<Button variant='contained' onClick={handleOpen}>
				Add Container
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						position: 'absolute' as 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
            minWidth: 300,
						maxWidth: 500,
						// bgcolor: 'background.paper',
						// border: '2px solid #000',
						// boxShadow: 24,
						p: { sm: 0, md: 4 },
					}}
					component='form'
					onSubmit={formik.handleSubmit}
				>
					<Paper sx={{ p: 3 }} elevation={6}>
						<Typography>New Container</Typography>
						<Grid container spacing={2} sx={{ my: 2 }}>
							<Grid item xs={12}>
								<FormControl>
									<FormLabel id='container-type-group'>Type</FormLabel>
									<RadioGroup row aria-labelledby='container-type-group' defaultValue='20ft' name='type'>
										<FormControlLabel value='20ft' control={<Radio />} label='20 ft' />
										<FormControlLabel value='40ft' control={<Radio />} label='40 ft' />
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label='Contain'
									required
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
								<FormControlLabel control={<Checkbox />} label='Forklift Operator' />
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel control={<Checkbox />} label='Strech Wrap' />
							</Grid>
							<Grid item xs={12}>
								<TextField label='Additional Info' fullWidth multiline rows={2} variant='standard' />
							</Grid>
							<Grid item xs={12} justifyContent='flex-end'>
								<Button sx={{ mr: 3 }}>Go back</Button>
								<Button variant='contained' type='submit'>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Box>
			</Modal>
		</>
	)
}
