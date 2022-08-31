import * as React from 'react'
// MUI Styles
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
// Icons
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
// Others
import useOrder from '../../hooks/useOrder'

type Props = {
	open: boolean
	handleClose: () => void
}

export default function AttachmentInput(props: Props) {
	const { open, handleClose } = props
  const { loading, addFileToOrder } =  useOrder()
	const theme = useTheme()
	const [file, setFile] = React.useState<any | null>(null)

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	}

	const handleDeleteFile = () => {
		setFile(null)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0])
		}
	}

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault()
		if (file) {
			const formData = new FormData()
			formData.append('file', file)
			await addFileToOrder(formData)
			handleClose()
		}
	}

	return (
		<Grid container component='form' onSubmit={handleSubmit}>
			{file && (
				<Grid
					item
					xs={12}
					component={Paper}
					sx={{
						display: 'grid',
						placeContent: 'center',
						width: { xs: 250, md: 500 },
						height: 200,
					}}
				>
					<Paper
						sx={{
							padding: 0,
							background: theme => theme.palette.grey[600],
							position: 'relative',
						}}
					>
						<IconButton
							onClick={handleDeleteFile}
							sx={{
								position: 'absolute',
								top: 0,
								right: 0,
                '&:hover': {
                  color: theme.palette.error.main
                },
							}}
						>
							<CloseIcon />
						</IconButton>
						<Box
							sx={{
                margin: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<InsertDriveFileIcon sx={{ fontSize: '5rem' }} />
							<Typography variant='caption' sx={{ maxWidth: '6rem' }}>
								{file.name}
							</Typography>
						</Box>
					</Paper>
				</Grid>
			)}
			{!file && (
				<Grid
					item
					xs={12}
					component={Paper}
					sx={{
						position: 'relative',
						display: 'grid',
						placeContent: 'center',
						width: { xs: 250, md: 500 },
						height: 200,
					}}
				>
					<NoteAddIcon color='disabled' fontSize='large' sx={{ margin: '0 auto' }} />
					<Typography variant='h6' sx={{ marginTop: 2, color: theme => theme.palette.grey[600], fontWeight: 'bold' }}>
						{`Drag & drop files`}
					</Typography>
					<Zoom
						in={open}
						timeout={transitionDuration}
						style={{ transitionDelay: `${open ? transitionDuration.exit : 0}ms` }}
						unmountOnExit
					>
						<Fab
							color='primary'
							sx={{ position: 'absolute', bottom: 20, right: 20 }}
							aria-label='add'
							component='label'
						>
							<AddIcon />
							<input hidden accept='*' type='file' name='file' onChange={handleChange} />
						</Fab>
					</Zoom>
				</Grid>
			)}
			<Grid item xs={12}>
				<Stack direction='row' spacing={2} justifyContent='flex-end' sx={{ marginTop: 2 }}>
					<Button onClick={handleClose}>Go back</Button>
					<LoadingButton variant='contained' type='submit' disabled={!file} loading={loading}>
						Upload
					</LoadingButton>
				</Stack>
			</Grid>
		</Grid>
	)
}
