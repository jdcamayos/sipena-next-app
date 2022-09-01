import { useRouter } from 'next/router'
import * as React from 'react'
// MUI Styles
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
// Components
import BrandLink from './BrandLink'
import SideBar from './Sidebar'
import ThemeButton from './ThemeButton'
// Hooks
import useAuth from '../../hooks/useAuth'

const colorRole = {
	admin: 'red',
	customer: 'green',
	worker: 'orange',
}

export default function Header() {
	const { state, logout } = useAuth()
	const router = useRouter()
	const [openSideBar, setOpenSideBar] = React.useState(false)
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

	const handleOpenSideBar = (event: React.MouseEvent<HTMLElement>) => {
		setOpenSideBar(!openSideBar)
	}

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleLogout = () => {
		logout()
		handleCloseUserMenu()
	}

	const handleLinkUserMenu = (to: string) => {
		router.push(to)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	return (
		<>
			<AppBar position='absolute' sx={{
				backgroundColor: 'primary.main'
			}}>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						{/* Desktop BrandLink */}
						<BrandLink />
						{/* Desktop BrandLink */}
						{!!state.auth.isAuth && (
							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleOpenSideBar}
									color='inherit'
								>
									<MenuIcon />
								</IconButton>
							</Box>
						)}
						{/* Mobile BrandLink */}
						<BrandLink isMobile={true} />
						{/* Mobile BrandLink */}
						{/* Desktop NavLinks */}
						{state.auth.isAuth && (
							<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
									<Button
										onClick={() => handleLinkUserMenu('/')}
										sx={{ my: 2, color: 'white', display: 'block' }}
									>
										Home
									</Button>
									{state.user?.role === 'customer' && (
										<Button
											onClick={() => handleLinkUserMenu('/orders/new')}
											sx={{ my: 2, color: 'white', display: 'block' }}

										>
											New Order
										</Button>
									)}
							</Box>
						)}
						{/* Desktop NavLinks */}
						{state.auth.isAuth && (
							<Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
								<Paper
									sx={{
										backgroundColor: state.user?.role && colorRole[state.user?.role],
										px: 0.5,
										color: 'white',
										fontWeight: 'semibold',
										display: 'flex',
										justifyContent: 'center',
									}}
									elevation={6}
								>
									<Typography variant='caption'>{state.user?.role}</Typography>
								</Paper>
								<Tooltip title='User settings'>
									<>
										<IconButton onClick={handleOpenUserMenu} component={Paper} elevation={6} sx={{ p: 0 }}>
											{/* <Avatar alt={auth.user?.email} src="/static/images/avatar/2.jpg" /> */}
											<Avatar  sx={{ backgroundColor: state.user?.role && colorRole[state.user?.role], color: 'white' }}>
												{state.user?.email[0].toLocaleUpperCase()}
											</Avatar>
										</IconButton>
									</>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id='menu-appbar'
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem>
										<Typography textAlign='center' fontWeight='bold'>
											{state.user?.email}
										</Typography>
									</MenuItem>
									<Divider />
									<ThemeButton />
									{state.user?.role === 'admin' && (
										<MenuItem onClick={() => handleLinkUserMenu('/admin')}>
											<Typography textAlign='center' width='100%'>
												Admin
											</Typography>
										</MenuItem>
									)}
									<MenuItem onClick={() => handleLinkUserMenu('/profile')}>
										<Typography textAlign='center' width='100%'>
											Profile
										</Typography>
									</MenuItem>
									<MenuItem onClick={handleLogout}>
										<Typography textAlign='center' width='100%'>
											Logout
										</Typography>
									</MenuItem>
								</Menu>
							</Box>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			<SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
		</>
	)
}
