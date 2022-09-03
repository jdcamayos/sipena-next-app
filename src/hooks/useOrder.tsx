import { AppContext } from '../contexts/AppContext'
import { AddCommentDto, Order } from '../types'
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
      const order = await ordersService.findOne(actualOrderId)
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
      // Service
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
      // Service
      const comment = await ordersService.addCommentToOrder(order.id, addCommentDto)
      dispatch(action.addCommentRequest(comment))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const addWorker = async () => {
    try {
      setLoading(true)
      // Service
      // const worker = await ordersService.addWorkerToOrder(order.id, addWorkerDto)
      dispatch(action.addWorkerRequest({}))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return { order, loading, setOrderId, addAttachment, addComment, addWorker }
}
