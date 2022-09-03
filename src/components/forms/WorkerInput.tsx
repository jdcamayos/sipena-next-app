import * as React from 'react'
// MUI Styles
import { useTheme } from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
// Icons
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
// Hooks
import useOrder from '../../hooks/useOrder'

interface Props {
  open: boolean
  handleClose: () => void
}

const options = [
  {
    "id": "cl752hhuz00125x9yhrawam7j",
    "createdAt": "2022-08-22T18:03:48.779Z",
    "updatedAt": "2022-08-22T18:04:26.300Z",
    "email": "worker@undefined.sh",
    "role": "worker"
  },
  {
    "id": "cl752hhuz00125x9yhrbtgm7j",
    "createdAt": "2022-08-22T18:03:48.779Z",
    "updatedAt": "2022-08-22T18:04:26.300Z",
    "email": "worker2@undefined.sh",
    "role": "worker"
  },
  {
    "id": "cl752hhuz00155x9yh2ewam7j",
    "createdAt": "2022-08-22T18:03:48.779Z",
    "updatedAt": "2022-08-22T18:04:26.300Z",
    "email": "worker3@undefined.sh",
    "role": "worker"
  }
]

export default function WorkerInput(props: Props) {
  const { open, handleClose } = props
  const { loading, addWorker } = useOrder()
  const [workers, setWorkers] = React.useState(options[0].email)
  const [worker, setWorker] = React.useState<string | null>('')

  const handleChange = (event: any, newValue: string | null) => {
    setWorker(newValue)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log(worker)
    handleClose()
  }

  return (
    <Grid container component="form" onSubmit={handleSubmit}>
      <Grid item xs={12} sx={{ paddingTop: 2 }}>
        <Autocomplete
          value={worker}
          onChange={handleChange}
          options={options.map(op => op.email)}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Controlable" />}

        />
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
