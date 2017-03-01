import {combineReducers} from 'redux'
import editor from '../reducers/editor'
import layouts from '../reducers/layouts'
import contents from '../reducers/contents'
import map from '../reducers/map'

const rootReducer = combineReducers({
  editor,
  layouts,
  contents,
  map
})

export default rootReducer
