import * as R from 'ramda'
import { Keys } from '../actions'

const reducer = (state={}, action) => R.cond([
  [R.equals(Keys.TYPE.request_key), R.always(action.payload)],
  [R.equals(Keys.TYPE.load_saved_keys), R.always(action.payload)],
  [R.T, R.always(state)]
])(action.type)

export default reducer
