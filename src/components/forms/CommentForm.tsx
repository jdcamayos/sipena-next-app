import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// Icons
import AddIcon from '@mui/icons-material/Add'
// Components
import CommentInput from './CommentInput'

interface Props {}

export default function CommentForm(props: Props) {
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
				Add comment
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add comment</DialogTitle>
				<DialogContent>
					<CommentInput open={open} handleClose={handleClose} />
				</DialogContent>
			</Dialog>
    </>
  )
}
