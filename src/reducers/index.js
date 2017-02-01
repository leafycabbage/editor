import {combineReducers} from 'redux'
import editor from '../reducers/editor'
import layout from '../reducers/layout'

const rootReducer = combineReducers({
  editor,
  layout
})

export default rootReducer
