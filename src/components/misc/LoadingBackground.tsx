import * as React from 'react'
// MUI Styles
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function LoadingBackground() {
	return (
		<Backdrop
      sx={{
        color: '#fff',
        zIndex: theme => theme.zIndex.drawer + 1
      }}
      open={true}
      // onClick={handleClose}
    >
			<CircularProgress color='inherit' />
		</Backdrop>
	)
}
