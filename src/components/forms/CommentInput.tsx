import * as React from 'react'
// MUI Styles

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
// Hooks
import useOrder from '../../hooks/useOrder'

interface Props {
  open: boolean
  handleClose: () => void
}

export default function CommentInput(props: Props) {
  const { handleClose } = props
  const [comment, setComment] = React.useState("")
  const { loading, addComment } = useOrder()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleSubmit = async (event:  React.SyntheticEvent) => {
    event.preventDefault()
    await addComment({ content: comment })
    handleClose()
  }

  return (
    <Grid container component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField
          onChange={handleChange}
          value={comment}
          multiline
          fullWidth
          rows={4}
          placeholder="Your comment here"
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
