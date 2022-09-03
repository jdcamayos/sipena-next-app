import { NextPage } from 'next'
import * as React from 'react'
// Components
import DashboardLayout from '../components/dashboard/DashboardLayout'
import OrdersTable from '../components/tables/OrdersTable'

export default function Home(props: NextPage) {
	return (
		<DashboardLayout>
			<OrdersTable />
		</DashboardLayout>
	)
}
