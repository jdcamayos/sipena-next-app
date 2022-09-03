import { AppContext } from '../contexts/AppContext'
import { UsersService } from '../services'
import * as action from '../app/actions'
import * as React from 'react'

export default function useWorkers() {
  const [loading, setLoading] = React.useState(false)
  const { state, dispatch } = React.useContext(AppContext)
	const { data: workers, meta } = state.workers

	const usersService = new UsersService()

	React.useEffect(() => {
		if (!workers.length) {
			fetchWorkers()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchWorkers = async () => {
		try {
			setLoading(true)
			const response = await usersService.findAll()
			dispatch(action.getUsersRequest(response))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

  return { loading, workers, meta }
}
