import * as React from 'react'
import LinkRouter from 'next/link'
// MUI Styles
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
// Icons
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ListAltIcon from '@mui/icons-material/ListAlt'

interface Props {
	openSideBar: boolean
	setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar(props: Props) {
	const { openSideBar, setOpenSideBar } = props

	const list = () => (
		<Box
			sx={{ width: 250 }}
			role='presentation'
			onClick={() => setOpenSideBar(false)}
			onKeyDown={() => setOpenSideBar(false)}
		>
			<List>
				<ListItem disablePadding>
					<ListItemButton component={LinkRouter} href='/order/new'>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary='New Order' />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton component={LinkRouter} href='/'>
						<ListItemIcon>
							<ListAltIcon />
						</ListItemIcon>
						<ListItemText primary='Orders' />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	)

	return (
		<Drawer
      anchor='left'
      open={openSideBar}
      onClose={() => setOpenSideBar(false)}
    >
			{list()}
		</Drawer>
	)
}
