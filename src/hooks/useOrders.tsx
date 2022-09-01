import * as React from 'react'
import { AppContext } from '../contexts/AppContext'
import { OrdersService } from '../services'
import { Meta, OrderItem } from '../types'

export default function useOrders() {
	const [loading, setLoading] = React.useState(false)
	const [orders, setOrders] = React.useState<OrderItem[]>([])
	const [meta, setMeta] = React.useState<Meta>({} as Meta)
	const { state } = React.useContext(AppContext)

	const ordersService = new OrdersService()

	React.useEffect(() => {
		fetchOrders()
	})

	const fetchOrders = async (limit?: number, offset?: number) => {
		try {
			setLoading(true)
			if (state.user?.role === 'admin') {
				const { data, meta } = await ordersService.findAll()
				setOrders(data)
				setMeta(meta)
			}
			if (state.user?.role === 'customer') {
				const { data, meta } = await ordersService.findAllByCustomer()
				setOrders(data)
				setMeta(meta)
			}
			if (state.user?.role === 'worker') {
				const { data, meta } = await ordersService.findAllByWorker()
				setOrders(data)
				setMeta(meta)
			}
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

	const prevPage = async () => {
		try {
			setLoading(true)

			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return { orders, meta, loading, nextPage, prevPage }
}
