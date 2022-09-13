import * as React from 'react'
// MUI Styles
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import Avatar, { AvatarProps } from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Fab from '@mui/material/Fab'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Zoom from '@mui/material/Zoom'
// Icons
import AddIcon from '@mui/icons-material/Add'
import UploadIcon from '@mui/icons-material/Upload'
import { colorRole } from '../../utils/color-role'
import Image from 'next/image'
// Hooks
import useUsers from '../../hooks/useUsers'
// Others
import { config } from '../../config'

interface MyAvatarProps extends AvatarProps {
	role: 'admin' | 'customer' | 'worker'
}

const MyAvatar = styled(Avatar)<MyAvatarProps>(({ theme, role }) => ({
	[theme.breakpoints.up('xs')]: {
		width: 120,
		height: 120,
		fontSize: 80,
	},
	[theme.breakpoints.up('md')]: {
		width: 200,
		height: 200,
		fontSize: 60,
	},
	border: `3px solid ${colorRole[role].main}`,
	backgroundColor: colorRole[role].background,
}))

const AvatarButton = styled(Avatar)<AvatarProps>(({ theme }) => ({
	border: `2px solid ${theme.palette.background.default}`,
}))

interface Props {
	email: string
	role: 'admin' | 'customer' | 'worker'
	image: string
}

interface UploadImageInputProps {
	open: boolean
	handleClose: () => void
}

function UploadImageInput(props: UploadImageInputProps) {
	const { open, handleClose } = props
	const [file, setFile] = React.useState<any | null>(null)
	const [previewImage, setPreviewImage] = React.useState<any | null>(null)
	const theme = useTheme()
	const { addUserImage } = useUsers()

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	}

	const handleDeleteFile = () => {
		setFile(null)
		setPreviewImage(null)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			let reader = new FileReader()
			let file = event.target.files[0]

			reader.onloadend = () => {
				setFile(file)
				setPreviewImage(reader.result)
			}

			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault()
		if (file) {
			const formData = new FormData()
			formData.append('file', file)
			await addUserImage(formData)
			handleClose()
		}
	}

	return (
		<Grid container spacing={2} component="form" onSubmit={handleSubmit}>
			<Grid item xs={12} sx={{ position: 'relative' }}>
				<Paper sx={{ position: 'relative', minWidth: 250, minHeight: 250, background: 'grey' }}>
					{previewImage && <Image src={previewImage} layout='fill' objectFit='cover' alt='upload-image' />}
				</Paper>
				{!file && (
					<Zoom
						in={open}
						timeout={transitionDuration}
						style={{ transitionDelay: `${open ? transitionDuration.exit : 0}ms` }}
						unmountOnExit
					>
						<Fab
							color='primary'
							sx={{ position: 'absolute', bottom: 10, right: 10 }}
							aria-label='add'
							component='label'
						>
							<AddIcon />
							<input hidden accept='*' type='file' name='file' onChange={handleChange} />
						</Fab>
					</Zoom>
				)}
			</Grid>
			{/* {file && ( */}
			<Grid item xs={12}>
				<Stack direction='row' spacing={2} justifyContent="space-between">
					<Button variant='outlined' onClick={handleDeleteFile} disabled={!file}>
						Change
					</Button>
					<Button variant='contained' type="submit" disabled={!file}>
						Set Image
					</Button>
				</Stack>
			</Grid>
			{/* )} */}
		</Grid>
	)
}

function UploadButton() {
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<IconButton onClick={handleOpen}>
				<AvatarButton>
					<UploadIcon />
				</AvatarButton>
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add image</DialogTitle>
				<DialogContent>
					<UploadImageInput open={open} handleClose={handleClose} />
				</DialogContent>
			</Dialog>
		</>
	)
}

export default function BigAvatar(props: Props) {
	const { email, role, image } = props
	return (
		<Grid item xs={12} md={6} sx={{ display: 'grid', placeContent: 'center' }}>
			<Badge
				badgeContent={<UploadButton />}
				overlap='circular'
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<MyAvatar role={role} src={`${config.backendUrl}/${image}`}>
					{email.split('')[0].toUpperCase()}
				</MyAvatar>
			</Badge>
		</Grid>
	)
}
