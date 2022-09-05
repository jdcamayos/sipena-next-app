import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// Icons
import EditIcon from '@mui/icons-material/Edit'
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
			{!isUpdate && (
				<Button variant='outlined' onClick={handleClickOpen}>
					Create Customer
				</Button>
			)}
			{isUpdate && (
				<IconButton sx={{ position: "absolute", right: 0 }} onClick={handleClickOpen}>
					<EditIcon />
				</IconButton>
			)}
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
