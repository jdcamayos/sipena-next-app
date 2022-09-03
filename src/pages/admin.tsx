import { NextPage } from 'next'
import * as React from 'react'
// Components
import DashboardLayout from '../components/dashboard/DashboardLayout'
import UsersTable from '../components/tables/UsersTable'

export default function Admin(props: NextPage) {
  return (
    <DashboardLayout>
      <UsersTable />
    </DashboardLayout>
  )
}
