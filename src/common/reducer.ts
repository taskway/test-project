import { ActionTypes } from './types'

const initialState = {}

export const appReducer = (state = initialState, action: ActionTypes): typeof initialState => {
  switch (action.type) {
    default: return state
  }
}
