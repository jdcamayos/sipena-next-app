import * as React from 'react'
import { AppContext } from '../contexts/AppContext'
import { CreateContainerDto, UpdateContainerDto } from '../types'
import * as action from '../app/actions'
import { OrdersService } from '../services'
import { useRouter } from 'next/router'

export default function useNewOrder() {
	const { state, dispatch } = React.useContext(AppContext)
	const [loading, setLoading] = React.useState(false)
	const order = state.newOrder
	const ordersService = new OrdersService()
	const router = useRouter()

	React.useEffect(() => {
		if (order.customerId.length === 0 && state.customer) {
			dispatch(action.createOrder(state.customer.id))
		}
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

	const sendOrder = async () => {
		try {
			setLoading(true)
			const createOrderDto = {
				...order,
				containers: order.containers.map(container => {
					const { id, ...rest } = container
					return rest
				})
			}
			const newOrder = await ordersService.create(createOrderDto)
			if (newOrder.id) {
				dispatch(action.createOrderRequest({}))
				router.push('/')
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return { order, loading, setDate, addContainer, editContainer, removeContainer, sendOrder }
}
