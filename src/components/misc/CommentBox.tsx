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
import { config } from '../../config'
import { colorRole } from '../../utils/color-role'
import { getUsername } from '../../utils/username'

interface CommentItemProps {
	comment: Comment
	isCustomer: boolean
}

const CommentItem = (props: CommentItemProps) => {
	const { comment: co, isCustomer } = props
	const username = getUsername(co.author.email)
	return (
		<Grid item xs={12}>
			<Paper sx={{ padding: 2 }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Avatar
						src={`${config.filesUrl}/${co.author.image}`}
						sx={{
							width: { xs: 40, md: 50 },
							height: { xs: 40, md: 50 },
							textAlign: 'center',
							backgroundColor: co.author.role && colorRole[co.author.role].background,
							color: 'black',
							border: `1px solid ${(co.author.role && colorRole[co.author.role].main) || 'grey'}`,
						}}
					>
						{co.author.email.split('')[0].toUpperCase()}
					</Avatar>
					<Box sx={{ marginLeft: 2, overflow: 'hidden' }}>
						<Grid container>
							<Grid item xs={12}>
								<Typography sx={{ width: '100%', fontWeight: 'bold', textOverflow: 'ellipsis' }}>
									{isCustomer ? username : co.author.email}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography sx={{ width: '100%', fontWeight: 'light', textOverflow: 'ellipsis', fontSize: 13, color: theme => theme.palette.grey[600] }}>
									{dateRegistered(co.createdAt)}
								</Typography>
							</Grid>
						</Grid>
						<Typography sx={{ width: '100%', wordBreak: 'break-word' }}>{co.content}</Typography>
					</Box>
				</Box>
			</Paper>
		</Grid>
	)
}

interface Props {
	comments: Comment[]
	isCustomer: boolean
}

export default function CommentBox(props: Props) {
	const { comments, isCustomer } = props
	return (
		<Paper sx={{ padding: 2, marginTop: 2 }}>
			<Grid container spacing={2}>
				{!comments.length && (
					<Typography align='center' sx={{ width: '100%' }}>
						No comments yet
					</Typography>
				)}
				{comments.map(co => (
					<CommentItem key={co.id} comment={co} isCustomer={isCustomer} />
				))}
			</Grid>
		</Paper>
	)
}
