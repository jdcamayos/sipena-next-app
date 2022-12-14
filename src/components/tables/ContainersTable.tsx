import * as React from 'react'
// MUI Styles
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
// Icons
import DeleteIcon from '@mui/icons-material/Delete'
// Components
import ContainerForm from '../forms/ContainerForm'
// Types
import { Container, CreateContainerItem } from '../../types'

interface Props {
	isForm: boolean
	containers:  CreateContainerItem[] | Container[],
	removeContainer?: (id: number) => void
}

export default function ContainersTable(props: Props) {
	const { containers, isForm, removeContainer } = props
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Box sx={{ width: "100%" }}>
				<Typography align='left' variant='h6' fontWeight={!isForm ? "bold" : 500} sx={{ marginBottom: 2, marginLeft: isForm ? 2 : 0 }}>
					Containers
				</Typography>
			</Box>
			<TableContainer component={Paper}>
				<Table size='small' aria-label='container table'>
					<TableHead sx={{ backgroundColor: "primary.main" }}>
						<TableRow>
							{isForm && <TableCell align='center'>Action</TableCell>}
							<TableCell align='center'>Type</TableCell>
							<TableCell align='center'>Contain</TableCell>
							<TableCell align='center'>Carton Count</TableCell>
							<TableCell align='center'>Weight [kg]</TableCell>
							<TableCell align='center'>Forklift Operator</TableCell>
							<TableCell align='center'>Stretch Wrap</TableCell>
							<TableCell align='center'>Additional Info</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!containers.length && (
							<TableRow>
								<TableCell colSpan={8} align='center'>
									Not containers yet
								</TableCell>
							</TableRow>
						)}
						{!!containers.length &&
							containers.map(container => (
								<TableRow key={container.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									{isForm && (
										<TableCell align='center'>
											<ContainerForm isUpdate={true} initialValues={container} />
											<IconButton onClick={() =>  typeof container.id === 'number' && removeContainer && removeContainer(container.id)}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									)}
									<TableCell align='center'>{container.type}</TableCell>
									<TableCell align='center'>{container.contain}</TableCell>
									<TableCell align='center'>{container.productQuantity}</TableCell>
									<TableCell align='center'>{container.productWeight}</TableCell>
									<TableCell align='center'>{container.forkliftOperator ? 'Yes' : 'No'}</TableCell>
									<TableCell align='center'>{container.stretchWrap ? 'Yes' : 'No'}</TableCell>
									<TableCell align='center'>{container.additionalInfo}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
