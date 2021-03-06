import * as openpgp from 'openpgp'

const TYPE = {
  decrypt_msg: 'DECRYPT_MSG',
  decrypt_error: 'DECRYPT_ERROR',
}

const _decryptMessage = data => async dispatch => {
  let options = {
    message: await openpgp.message.readArmored(data.message),
    privateKeys: [data.privateKey],
    // publicKeys: openpgp.key.readArmored(data.keygen.pubKey).keys[0] // for verification (optional)
  }

  return openpgp
    .decrypt(options)
    .then(plaintext => {
      dispatch({ type: TYPE.decrypt_msg, payload: plaintext.data })
    })
    .catch(err => dispatch({ type: TYPE.decrypt_error, payload: err.data }))
}

export default {
  TYPE,
  _decryptMessage,
}
