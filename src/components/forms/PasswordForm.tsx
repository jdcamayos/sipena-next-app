import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// Components
import PasswordInput from './PasswordInput'

export default function PasswordForm() {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Button variant='outlined' onClick={handleClickOpen} fullWidth>
				Change password
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Change your password</DialogTitle>
				<DialogContent>
					<PasswordInput handleClose={handleClose} />
				</DialogContent>
			</Dialog>
		</>
	)
}
