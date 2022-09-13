import { AppContext } from '../contexts/AppContext'
import { AddCommentDto, AddWorkerDto, Order } from '../types'
import { OrdersService } from '../services'
import * as action from '../app/actions'
import * as React from 'react'

export default function useOrder() {
	const [loading, setLoading] = React.useState(false)
	const { state, dispatch } = React.useContext(AppContext)
	const { order, actualOrderId } = state

	const ordersService = new OrdersService()

	React.useEffect(() => {
		if (!order.id) {
			fetchOrder(actualOrderId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		fetchOrder(actualOrderId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actualOrderId])

	const setOrderId = (orderId: Order['id']) => {
		dispatch(action.setOrderId(orderId))
	}

	const fetchOrder = async (orderId: Order['id']) => {
		try {
			setLoading(true)
			if (!orderId) {
				setLoading(false)
				return
			}
			const order = await ordersService.findOne(orderId)
			dispatch(action.getOrderRequest(order))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const addAttachment = async (addAttachmentDto: FormData) => {
		try {
			setLoading(true)
			const attachment = await ordersService.addAttachmentToOrder(order.id, addAttachmentDto)
			dispatch(action.addAttachmentRequest(attachment))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const addComment = async (addCommentDto: AddCommentDto) => {
		try {
			setLoading(true)
			const comment = await ordersService.addCommentToOrder(order.id, addCommentDto)
			dispatch(action.addCommentRequest(comment))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const addWorker = async (addWorkerDto: AddWorkerDto) => {
		try {
			setLoading(true)
			const worker = await ordersService.addWorkerToOrder(order.id, addWorkerDto)
			console.log(worker)
			dispatch(action.addWorkerRequest(worker))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return { order, loading, setOrderId, addAttachment, addComment, addWorker }
}
