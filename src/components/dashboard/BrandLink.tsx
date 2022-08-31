import * as React from 'react'
import Image from 'next/image'
import RouterLink from 'next/link'
// MUI Styles
import Box from '@mui/material/Box'

interface Props {
	isMobile?: boolean
}

export default function BrandLink({ isMobile = false }: Props) {
	return (
		<Box
			component={RouterLink}
			href='/'
			sx={{
				position: 'relative',
				display: {
					xs: isMobile ? 'flex' : 'none',
					md: isMobile ? 'none' : 'flex',
				},
				mr: 1,
				flexGrow: isMobile ? 1 : 0,
			}}
		>
			<Box
				sx={{
					display: {
						xs: isMobile ? 'flex' : 'none',
						md: isMobile ? 'none' : 'flex',
					},
					position: 'relative',
					width: 100,
					height: 50,
				}}
			>
				<Image
					priority={true}
					src='/assets/logo2.svg'
					alt='Logo sipena'
					layout='fill'
					objectFit='contain'
				/>
			</Box>
		</Box>
	)
}
