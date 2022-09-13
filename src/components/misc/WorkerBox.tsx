import * as React from 'react'
// MUI Styles
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// Types
import { Worker } from '../../types'

interface WorkerItemProps {
  worker: Worker
}

const WorkerItem = (props: WorkerItemProps) => {
  const { worker: wo } = props
  return (
    <Grid item>
      <Paper
        sx={{
          padding: 2,
          display: "flex",
          gap: 2,
          alignItems: "center"
        }}
      >
        <Avatar>{wo.user.email.split('')[0]}</Avatar>
        <Typography>{wo.user.email}</Typography>
      </Paper>
    </Grid>
  )
}

interface Props {
  workers: Worker[]
}

export default function WorkerBox(props: Props) {
  const { workers } = props
  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Grid container spacing={1}>
        {!workers.length && (<Typography align="center" sx={{ width: "100%" }}>No workers assigned yet.</Typography>)}
        {workers.map(wo => (
          <WorkerItem key={wo.id} worker={wo} />
        ))}
      </Grid>
    </Paper>
  )
}
