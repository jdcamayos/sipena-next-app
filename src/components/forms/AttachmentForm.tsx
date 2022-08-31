import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// Icons
import AddIcon from '@mui/icons-material/Add'
// Others
import AttachmentInput from './AttachmentInput'


export default function AttachmentForm() {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	return (
		<>
			<Button variant='outlined' startIcon={<AddIcon />} onClick={handleClickOpen}>
				Add file
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add file</DialogTitle>
				<DialogContent>
					<AttachmentInput open={open} handleClose={handleClose} />
				</DialogContent>
			</Dialog>
		</>
	)
}
