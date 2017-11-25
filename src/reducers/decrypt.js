import * as R from 'ramda'
import { Decrypt } from '../actions'

const reducer = (state={}, action) => R.cond([
  [R.equals(Decrypt.TYPE.decrypt_msg), R.always(action.payload)],
  [R.T, R.always(state)]
])(action.type)

export default reducer
