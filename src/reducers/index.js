import { combineReducers } from 'redux'
import encrypt             from './encrypt'
import decrypt             from './decrypt'
import keys                from './key'

export default combineReducers ({
  decrypt,
  encrypt,
  keys
})
