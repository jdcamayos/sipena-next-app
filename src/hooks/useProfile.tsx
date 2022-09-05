import { AppContext } from '../contexts/AppContext'
import { ChangeMyPasswordDto, CreateCustomerDto, UpdateCustomerDto } from '../types'
import { CustomersService, UsersService } from '../services'
import * as action from '../app/actions'
import * as React from 'react'

export default function useProfile() {
	const [loading, setLoading] = React.useState(false)
	const { state, dispatch } = React.useContext(AppContext)
	const { customer, user } = state

	const usersService = new UsersService()
	const customersService = new CustomersService()

	const changeMyPassword = async (changeMyPasswordDto: ChangeMyPasswordDto) => {
		try {
			setLoading(true)
			const user = await usersService.changeMyPassword(changeMyPasswordDto)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const createCustomer = async (createCustomerDto: CreateCustomerDto) => {
		try {
			setLoading(true)
			const customer = await customersService.create(createCustomerDto)
			dispatch(action.getCustomerRequest(customer))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const updateCustomer = async (updateCustomerDto: UpdateCustomerDto) => {
		try {
			setLoading(true)
			if (!customer) {
				return
			}
			const customerUpdated = await customersService.update(customer.id, updateCustomerDto)
			dispatch(action.getCustomerRequest(customerUpdated))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return { customer, user, loading, changeMyPassword, createCustomer, updateCustomer }
}
