import * as React from 'react'
// MUI Styles
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
// Icons
// import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
// import NoteAddIcon from '@mui/icons-material/NoteAdd'
// Others
import { Attachment } from '../../types'
import { config } from '../../config'

type Props = {
	attachments: Attachment[]
}

type AttachmentFileProps = {
	attachment: Attachment
}

const AttachmentFile = (props: AttachmentFileProps) => {
	const { attachment: at } = props
	// const navigate = useNavigate()
	// console.log(at)
	return (
		<Grid item xs={6} md={3} lg={2}>
			<Paper
				sx={{
					padding: 0,
					background: theme =>
						theme.palette.mode === 'light'
						 	? theme.palette.grey[300]
							: theme.palette.grey[600],
					height: "100%",
					position: 'relative',
					display: "grid",
					placeContent: "center"
				}}
			>
				<IconButton
					// onClick={handleDeleteFile}
					sx={{
						position: 'absolute',
						top: 0,
						right: 0,
						'&:hover': {
							color: theme =>
								theme.palette.mode === 'light'
								 	? theme.palette.error.light
									: theme.palette.error.dark,
						},
					}}
				>
					<DeleteIcon />
				</IconButton>
				<IconButton
					component="a"
					href={`${config.filesURL}/${at.path}`}
					target="_blank"
					download={at.originalname}
					// onClick={
					// 	() => window.location.href(`${config.backendURL}/${at.path}`)
					// }
					sx={{
						position: 'absolute',
						bottom: 0,
						right: 0,
						'&:hover': {
							color: theme => theme.palette.primary.main,
						},
					}}
				>
					<FileDownloadIcon/>
				</IconButton>
				<Box
					sx={{
						margin: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<InsertDriveFileIcon
						sx={{
							fontSize: '5rem',
							color: theme =>
								theme.palette.mode === 'light'
									? theme.palette.grey[600]
									: theme.palette.grey[100],
					 	}}
					/>
					<Typography variant='caption' sx={{ maxWidth: '100%' }} align="center">
						{at.originalname}
					</Typography>
				</Box>
			</Paper>
		</Grid>
	)
}

export default function AttachmentBox(props: Props) {
	const { attachments } = props
	return (
		<Paper sx={{ padding: 2 }}>
			<Grid container spacing={1}>
				{attachments.map(at => (
					<AttachmentFile key={at.id} attachment={at} />
				))}
			</Grid>
		</Paper>
	)
}
