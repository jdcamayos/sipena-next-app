import { AppContext } from '../contexts/AppContext'
import { OrdersService } from '../services'
import * as action from '../app/actions'
import * as React from 'react'

export default function useOrders() {
	const [loading, setLoading] = React.useState(false)
	const { state, dispatch } = React.useContext(AppContext)
	const { data: orders, meta } = state.orders

	const ordersService = new OrdersService()

	// Initial fetch
	React.useEffect(() => {
		if (!orders.length) {
			fetchOrders()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Fetch with something changed
	React.useEffect(() => {
		fetchOrders()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch])

	const fetchOrders = async (limit?: number, offset?: number) => {
		try {
			setLoading(true)
			if (state.user?.role === 'admin') {
				const response = await ordersService.findAll()
				console.log(response)
				dispatch(action.getOrdersRequest(response))
			}
			if (state.user?.role === 'customer') {
				const response = await ordersService.findAllByCustomer()
				console.log(response)
				dispatch(action.getOrdersRequest(response))
			}
			if (state.user?.role === 'worker') {
				const response = await ordersService.findAllByWorker()
				console.log(response)
				dispatch(action.getOrdersRequest(response))
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const prevPage = async () => {
		try {
			setLoading(true)

			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const nextPage = async () => {
		try {
			setLoading(true)

			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return { loading, orders, meta, prevPage, nextPage }
}
