import { NextPage } from 'next'
import * as React from 'react'
// Components
import DashboardLayout from '../components/dashboard/DashboardLayout'

export default function Home(props: NextPage) {
	return (
		<DashboardLayout>
			<div>
				This is home
			</div>
		</DashboardLayout>
	)
}
