import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// Components
import DashboardLayout from '../components/dashboard/DashboardLayout'
import LoadingBackground from '../components/misc/LoadingBackground'
import UsersTable from '../components/tables/UsersTable'
// Hooks
import useAuth from '../hooks/useAuth'

export default function Admin(props: NextPage) {
	const { loading, state } = useAuth()
	const { replace } = useRouter()

	React.useEffect(() => {
		if (!loading && !window.localStorage.getItem('access_token')) {
			replace('/login')
		}
		if (state.user?.role !== 'admin') {
			replace('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	if (loading) return <LoadingBackground />

	return (
		<DashboardLayout>
			<UsersTable />
		</DashboardLayout>
	)
}
