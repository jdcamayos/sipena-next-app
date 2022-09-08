import { AppContext } from '../contexts/AppContext'
import { OrdersService } from '../services'
import * as action from '../app/actions'
import * as React from 'react'

export default function useOrders() {
	const [loading, setLoading] = React.useState(false)
	const { state, dispatch } = React.useContext(AppContext)
	const { data: orders, meta } = state.orders
	const { ordersPage } = state

	const ordersService = new OrdersService()

	// Initial fetch
	React.useEffect(() => {
		if (!orders.length) {
			fetchOrders(ordersPage)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		fetchOrders(ordersPage)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ordersPage])

	const fetchOrders = async (ordersPage: number) => {
		try {
			setLoading(true)
			const offset = meta.itemsPerPage * (ordersPage - 1)
			const limit = 10
			if (state.user?.role === 'admin') {
				const response = await ordersService.findAll(limit, offset)
				if (response.data) {
					dispatch(action.getOrdersRequest(response))
				}
			}
			if (state.user?.role === 'customer') {
				const response = await ordersService.findAllByCustomer(limit, offset)
				if (response.data) {
					dispatch(action.getOrdersRequest(response))
				}
			}
			if (state.user?.role === 'worker') {
				const response = await ordersService.findAllByWorker(limit, offset)
				if (response.data) {
					dispatch(action.getOrdersRequest(response))
				}
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const setPage = (newPage: number) => {
		dispatch(action.setOrdersPage(newPage))
	}

	return { loading, orders, meta, setPage, ordersPage, state }
}
