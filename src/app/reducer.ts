import { initialState } from './initialState'
import { actions, ActionType } from './actions'

export const reducer = (state: typeof initialState, action: ActionType) => {
	switch (action.type) {
		case actions.registerRequest: {
			return {
				...state,
			}
		}
		case actions.loginRequest: {
			return {
				...state,
			}
		}
		case actions.logoutRequest: {
			return {
				...state,
			}
		}
		case actions.getMeRequest: {
			return {
				...state,
			}
		}
		case actions.getCustomerRequest: {
			return {
				...state,
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
			}
		}
		case actions.addContainer: {
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
