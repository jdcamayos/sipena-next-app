import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// Components
import DashboardLayout from '../components/dashboard/DashboardLayout'
import UsersTable from '../components/tables/UsersTable'
import useAuth from '../hooks/useAuth'

export default function Admin(props: NextPage) {
	const { loading, state } = useAuth()
	const { replace } = useRouter()

	React.useEffect(() => {
		if (!loading && !window.localStorage.getItem('access_token')) {
			replace('/login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	if (loading) return <div>Loading...</div>

	return (
		<DashboardLayout>
			<UsersTable />
		</DashboardLayout>
	)
}
