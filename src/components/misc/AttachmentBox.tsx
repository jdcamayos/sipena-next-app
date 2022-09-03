import { config } from '../../config'
import * as React from 'react'
// MUI Styles
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// Icons
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
// Types
import { Attachment } from '../../types'

interface AttachmentFileProps {
	attachment: Attachment
}

const AttachmentFile = (props: AttachmentFileProps) => {
	const { attachment: at } = props
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
					href={`${config.filesUrl}/${at.path}`}
					target="_blank"
					download={at.originalname}
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
					<Typography
						variant='caption'
						sx={{
							maxWidth: '100%',
							wordBreak: 'break-word'
						}}
						align="center"
					>
						{at.originalname}
					</Typography>
				</Box>
			</Paper>
		</Grid>
	)
}

interface Props {
	attachments: Attachment[]
}

export default function AttachmentBox(props: Props) {
	const { attachments } = props
	return (
		<Paper sx={{ padding: 2, marginTop: 2 }}>
			<Grid container spacing={1}>
				{attachments.map(at => (
					<AttachmentFile key={at.id} attachment={at} />
				))}
			</Grid>
		</Paper>
	)
}
