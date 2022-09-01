import * as React from 'react'
import { ActionType } from '../app/actions'
import { initialState } from '../app/initialState'
import { reducer } from '../app/reducer'
import { State } from '../types'

interface DefaultValue {
	state: State
	dispatch: React.Dispatch<ActionType>
}

const defaultValue = {
  state: initialState,
  dispatch: () => null
}

export const AppContext = React.createContext<DefaultValue>(defaultValue)

interface Props {
  children: React.ReactNode
}

export default function AppProvider(props: Props) {
	const [state, dispatch] = React.useReducer(reducer, initialState)

	return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  )
}
