import * as React from 'react'
// MUI Styles
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
// Hooks
import useOrder from '../../hooks/useOrder'
import useWorkers from '../../hooks/useWorkers'
// Types
import { AdminUser } from '../../types'

interface Props {
	open: boolean
	handleClose: () => void
}

export default function WorkerInput(props: Props) {
	const { open, handleClose } = props
	const { loading, addWorker } = useOrder()
	const { loading: loadingWorkers, workers } = useWorkers()
	const [worker, setWorker] = React.useState<string | null>(null)
	const [workerSelected, setWorkerSelected] = React.useState<AdminUser | null>(null)
	const [options, setOptions] = React.useState<string[]>([])

	React.useEffect(() => {
		if (workers.length > 0) {
			const options = workers.map(worker => worker.email)
			console.log('options', options)
			console.log('worker', options[0])
			setOptions(options)
			setWorker(options[0])
      setWorkerSelected(workers[0])
		}
	}, [workers, loadingWorkers])

	const handleChange = (event: any, newValue: string | null) => {
		setWorker(newValue)
		const workerSelect = newValue ? workers[workers.findIndex(wo => wo.email === newValue)] : null
		setWorkerSelected(workerSelect)
	}

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault()
		if (workerSelected) {
      console.log(workerSelected)
			addWorker({ userId: workerSelected.id})
		}
		handleClose()
	}

	return (
		<Grid container component='form' onSubmit={handleSubmit}>
			<Grid item xs={12} sx={{ paddingTop: 2 }}>
				{!loadingWorkers && (
					<Autocomplete
						value={worker}
						onChange={handleChange}
						options={options}
						fullWidth
						renderInput={params => <TextField {...params} label='Controlable' />}
					/>
				)}
			</Grid>
			<Grid item xs={12}>
				<Stack direction='row' spacing={2} justifyContent='flex-end' sx={{ marginTop: 2 }}>
					<Button onClick={handleClose}>Go back</Button>
					<LoadingButton variant='contained' type='submit' loading={loading}>
						Add
					</LoadingButton>
				</Stack>
			</Grid>
		</Grid>
	)
}
