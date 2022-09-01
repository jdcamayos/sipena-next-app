import * as React from 'react'
import { AppContext } from '../contexts/AppContext'
import { CreateContainerDto, UpdateContainerDto } from '../types'
import * as action from '../app/actions'

export default function useNewOrder() {
	const { state, dispatch } = React.useContext(AppContext)
	const [loading, setLoading] = React.useState(false)
	const initialValues = {
		date: new Date(),
		customerId: state.customer?.id ? state.customer.id : '',
		containers: [],
	}
	const order = state.newOrder

	React.useEffect(() => {
		dispatch(action.createOrder(initialValues))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const setDate = (date: string | Date) => {
		dispatch(action.setDate(date))
	}

	const addContainer = (container: CreateContainerDto) => {
		dispatch(action.addContainer(container))
	}

	const editContainer = (container: UpdateContainerDto) => {
		dispatch(action.editContainer(container))
	}

	const removeContainer = (id: number) => {
		dispatch(action.removeContainer(id))
	}

	const sendOrder = () => {
		try {
			setLoading(true)
			// Service
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return { order, loading, setDate, addContainer, editContainer, removeContainer, sendOrder }
}
