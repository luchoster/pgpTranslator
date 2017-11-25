import * as R from 'ramda'
import { Encrypt } from '../actions'

const reducer = (state={}, action) => R.cond([
  [R.equals(Encrypt.TYPE.encrypt_msg), R.always(action.payload)],
  [R.T, R.always(state)]
])(action.type)

export default reducer
