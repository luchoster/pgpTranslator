import * as R from 'ramda'
import { Decrypt } from '../actions'

const DEFAULT_STATE = {
  decrypt_message: '',
  decrypt_error: '',
}
const reducer = (state = DEFAULT_STATE, action) =>
  R.cond([
    [
      R.equals(Decrypt.TYPE.decrypt_msg),
      () => R.merge(state, { decrypt_message: action.payload }),
    ],
    [
      R.equals(Decrypt.TYPE.decrypt_error),
      () => R.merge(state, { decrypt_error: action.payoad }),
    ],
    [R.T, R.always(state)],
  ])(action.type)

export default reducer
