import * as React from 'react'
// MUI Styles
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// Types
import { Comment } from '../../types'
// Utils
import { dateRegistered } from '../../utils/dates'

interface CommentItemProps {
	comment: Comment
}

const CommentItem = (props: CommentItemProps) => {
	const { comment: co } = props
	return (
		<Grid item xs={12}>
			<Paper sx={{ padding: 2 }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Avatar>{co.userId.split('')[0]}</Avatar>
					<Box sx={{ marginLeft: 2, overflow: 'hidden' }}>
						<Grid container>
							<Grid item xs={12}>
								<Typography sx={{ width: '100%', fontWeight: 'bold', textOverflow: 'ellipsis' }}>
									{co.userId}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography sx={{ width: '100%', fontWeight: 'light', textOverflow: 'ellipsis' }}>
									{dateRegistered(co.createdAt)}
								</Typography>
							</Grid>
						</Grid>
						<Typography sx={{  width: '100%', wordBreak: 'break-word' }}>{co.content}</Typography>
					</Box>
				</Box>
			</Paper>
		</Grid>
	)
}

interface Props {
	comments: Comment[]
}

export default function CommentBox(props: Props) {
	const { comments } = props
	return (
		<Paper sx={{ padding: 2, marginTop: 2 }}>
			<Grid container spacing={2}>
				{comments.map(co => (
					<CommentItem key={co.id} comment={co} />
				))}
			</Grid>
		</Paper>
	)
}
