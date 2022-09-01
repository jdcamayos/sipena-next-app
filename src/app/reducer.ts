import { actions, ActionType } from './actions'
import { State } from '../types'

export const reducer = (state: State, action: ActionType): State => {
	switch (action.type) {
		case actions.loginRequest: {
			return {
				...state,
				auth: {
					isAuth: true,
					token: action.payload
				},
			}
		}
		case actions.logoutRequest: {
			return {
				...state,
				auth: {
					isAuth: false,
					token: ''
				},
				customer: null,
				user: null,
			}
		}
		case actions.getMeRequest: {
			return {
				...state,
				user: action.payload
			}
		}
		case actions.getCustomerRequest: {
			return {
				...state,
				customer: action.payload
			}
		}
		case actions.getOrdersRequest: {
			return {
				...state,
			}
		}
		case actions.createOrder: {
			return {
				...state,
				newOrder: {
					...state.newOrder,
					customerId: action.payload.customerId,
					date: new Date(),
				}
			}
		}
		case actions.setDate: {
			return {
				...state,
				newOrder: {
					...state.newOrder,
					date: new Date(action.payload)
				}
			}
		}
		case actions.addContainer: {
			return {
				...state,
				newOrder: {
					...state.newOrder,
					containers: [
						...state.newOrder.containers,
						{
							id: state.newOrder.containers.length === 0
								? state.newOrder.containers.length
								: state.newOrder.containers[state.newOrder.containers.length - 1].id + 1,
								...action.payload
						}
					]
				}
			}
		}
		case actions.editContainer: {
			return {
				...state,
				newOrder: {
					...state.newOrder,
					containers: [
						...state.newOrder.containers.filter(c => c.id !== action.payload.id),
						action.payload
					].sort((a, b) => a.id - b.id),
				}
			}
		}
		case actions.removeContainer: {
			return {
				...state,
				newOrder: {
					...state.newOrder,
					containers: [
						...state.newOrder.containers.filter(c => c.id !== action.payload)
					]
				}
			}
		}
		case actions.createOrderRequest: {
			return {
				...state,
			}
		}
		case actions.createOrderRequest: {
			return {
				...state,
			}
		}
		case actions.addAttachmentRequest: {
			return {
				...state,
			}
		}
		case actions.addCommentRequest: {
			return {
				...state,
			}
		}
		case actions.addWorkerRequest: {
			return {
				...state,
			}
		}
		default:
			return state
	}
}
