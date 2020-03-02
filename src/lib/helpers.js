import * as R from 'ramda'
import Bluebird from 'bluebird'
import localforage from 'localforage'
import openpgp from 'openpgp'

const KeyStore = localforage.createInstance({ name: 'KeyStore' })

const LOCAL_STORAGE_KEY = 'keygen'

const notNilOrEmpty = R.allPass([
  R.compose(
    R.not,
    R.isNil
  ),
  R.compose(
    R.not,
    R.isEmpty
  ),
])

const fromArmored = ({ privateKeyArmored, publicKeyArmored }) => {
  let k = null
  if (privateKeyArmored) {
    k = openpgp.key.readArmored(privateKeyArmored)
  } else {
    k = openpgp.key.readArmored(publicKeyArmored)
  }

  if (k && k.keys && k.keys.length === 1) {
    return k.keys[0]
  }

  return null
}

/**
 * Get keys from DB
 */
const getKeys = () =>
  KeyStore.getItem(LOCAL_STORAGE_KEY).then(keys => keys || {})

/**
 * Set keys to DB
 */

const setKeys = keys => KeyStore.setItem(LOCAL_STORAGE_KEY, keys)

/**
 * Remove keys to DB
 */

const removeKeys = keys => KeyStore.removeItem(LOCAL_STORAGE_KEY)

/**
 * Load keys from the keyring
 */
const loadKeys = () => {
  return Bluebird.resolve(getKeys())
}

export {
  fromArmored,
  notNilOrEmpty,
  KeyStore,
  LOCAL_STORAGE_KEY,
  getKeys,
  setKeys,
  loadKeys,
  removeKeys,
}
