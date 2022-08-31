import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// Components
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import LoadingBackground from '../../components/misc/LoadingBackground'

export default function Order(props: NextPage) {
	const router = useRouter()
	const orderId = Array.isArray(router.query.orderId) ? router.query.orderId[0] : router.query.orderId

	if (orderId === 'undefined') return <LoadingBackground />
	return <DashboardLayout>orderId</DashboardLayout>
}
