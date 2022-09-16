import * as React from 'react'
// MUI Styles
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// Types
import { Worker } from '../../types'
import { getUsername } from '../../utils/username'
import { colorRole } from '../../utils/color-role'

interface WorkerItemProps {
	worker: Worker
	isCustomer: boolean
}

const WorkerItem = (props: WorkerItemProps) => {
	const { worker: wo, isCustomer } = props
	const username = getUsername(wo.user.email)
	return (
		<Grid item>
			<Paper
				sx={{
					padding: 2,
					display: 'flex',
					gap: 2,
					alignItems: 'center',
				}}
			>
				<Avatar
					sx={{
						width: { xs: 40, md: 50 },
						height: { xs: 40, md: 50 },
						textAlign: 'center',
						backgroundColor: colorRole['worker'].background,
						color: 'black',
						border: `1px solid ${colorRole['worker'].main}`,
					}}
				>
					{wo.user.email.split('')[0].toUpperCase()}
				</Avatar>
				<Typography>{isCustomer ? username : wo.user.email}</Typography>
			</Paper>
		</Grid>
	)
}

interface Props {
	workers: Worker[]
	isCustomer: boolean
}

export default function WorkerBox(props: Props) {
	const { workers, isCustomer } = props
	return (
		<Paper sx={{ padding: 2, marginTop: 2 }}>
			<Grid container spacing={1}>
				{!workers.length && (
					<Typography align='center' sx={{ width: '100%' }}>
						No workers assigned yet.
					</Typography>
				)}
				{workers.map(wo => (
					<WorkerItem key={wo.id} worker={wo} isCustomer={isCustomer} />
				))}
			</Grid>
		</Paper>
	)
}
