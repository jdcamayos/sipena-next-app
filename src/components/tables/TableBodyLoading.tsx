import * as React from 'react'
// MUI Styles
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Skeleton from '@mui/material/Skeleton'

type SkillRowProps = {
	cells?: number
}

function SkillRow(props: SkillRowProps) {
	const { cells } = props

	return (
		<TableRow>
			{Array.from({ length: cells ? cells : 1 }).map((_, i) => (
				<TableCell key={`cell-${i}`}>
					<Skeleton variant='text' sx={{ fontSize: '1rem' }} />
				</TableCell>
			))}
		</TableRow>
	)
}

type Props = {
	loading: boolean
	cells: number
	rows: number
}

export default function TableBodyLoading(props: Props) {
	const { loading, cells, rows } = props

	if (!loading) return null

	return (
    <>
      {Array.from({ length: rows }).map((_, i) => <SkillRow key={i} cells={cells} />)}
    </>
  )
}
