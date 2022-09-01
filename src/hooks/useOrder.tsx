import * as React from 'react'
import { OrdersService } from '../services'
import { FindOneOrderResponse } from '../types'

export default function useOrder(orderId: string) {
  const [loading, setLoading] = React.useState(false)
  const [order, setOrder] = React.useState<FindOneOrderResponse>({} as FindOneOrderResponse)

  const ordersService = new OrdersService()

  React.useEffect(() => {
    fetchOrder()
  })

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const order = await ordersService.findOne(orderId)
      setOrder(order)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const addAttachment = async () => {
    try {
      setLoading(true)
      // Service
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const addComment = async () => {
    try {
      setLoading(true)
      // Service
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
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return { order, loading, addAttachment, addComment, addWorker }
}
