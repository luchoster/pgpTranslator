import openpgp from 'openpgp'
import { getKeys } from '../lib/helpers'

const TYPE = {
  request_key: 'REQUEST_KEY',
  load_saved_keys: 'GET_SAVED_KEYS',
}

const keyGen = options => dispatch =>
  openpgp
    .generateKey(options)
    .then(key => dispatch({ type: TYPE.request_key, payload: key }))
    .catch(err => console.log('err', err))

const savedKeys = () => dispatch =>
  getKeys().then(keygen => {
    dispatch({ type: TYPE.load_saved_keys, payload: keygen })
  })

const removeKeys = () => dispatch =>
  getKeys().then(keygen => {
    dispatch({ type: TYPE.load_saved_keys, payload: '' })
  })

export default {
  TYPE,
  keyGen,
  savedKeys,
}
