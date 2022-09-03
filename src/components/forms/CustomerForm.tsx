import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// Components
import CustomerInfo from './CustomerInfo'

interface Props {
	isUpdate?: boolean
}

export default function CustomerForm(props: Props) {
	const { isUpdate } = props
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Button variant='outlined' onClick={handleClickOpen}>
				{isUpdate ? 'Update Customer' : 'Create Customer'}
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{isUpdate ? 'Update Customer' : 'Create Customer'}</DialogTitle>
				<DialogContent>
					<CustomerInfo
						isForm={true}
						isUpdate={isUpdate}
						handleClose={handleClose}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}
