import * as React from 'react'
// MUI Styles
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
// Icons
import TaskIcon from '@mui/icons-material/Task'

interface Props {
	finishOrder: () => void
}

export default function CompleteOrderForm(props: Props) {
	const { finishOrder } = props
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	return (
		<>
			<Button
				onClick={handleClickOpen}
				variant='contained'
				sx={{
					position: 'absolute',
					right: 1,
					top: 1,
					textTransform: 'none',
					color: theme => theme.palette.mode === 'dark' ? 'black' : 'white',
					backgroundColor: theme => theme.palette.warning.main,
					'&:hover': {
						backgroundColor: theme => theme.palette.error.main,
						color: 'white',
					},
				}}
				endIcon={<TaskIcon />}
			>
				Close Order
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle align="center">Are you sure?</DialogTitle>
				<DialogContent>
					<Typography align="center" sx={{ paddingBottom: 2 }}>
						{`You're trying to close this order.`}
					</Typography>
					<Typography align="center" sx={{ paddingBottom: 2 }}>
						{`After closed, anybody can't add or modify attachments, comments, or
						workers.`}
					</Typography>
					<Stack  direction="row" spacing={2} justifyContent='space-between'>
						<Button fullWidth variant='outlined' color='error' onClick={() => finishOrder()}>
							Yes
						</Button>
						<Button fullWidth variant='contained' color='warning' onClick={handleClose}>
							No
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	)
}
