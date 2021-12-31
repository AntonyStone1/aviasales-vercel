/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ticketReducer from './reducers/ticketReducer'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(ticketReducer, composedEnhancer)

export default store
