import * as openpgp from 'openpgp'

const TYPE = {
  decrypt_msg: 'DECRYPT_MSG'
}

const _decryptMessage = data => dispatch => {
  let options = {
    message: openpgp.message.readArmored(data.message) ? openpgp.message.readArmored(data.message) : '',
    privateKey: data.privateKey,
    // publicKeys: openpgp.key.readArmored(data.keygen.pubKey).keys[0] // for verification (optional)
  }

  return openpgp.decrypt(options)
    .then( plaintext => dispatch({type: TYPE.decrypt_msg, payload: plaintext.data}) )
    .catch(err => console.log('ERROR --->>>', err))
    // .catch( err => dispatch({type: TYPE.decrypt_error, payload: err}) )
}

export default {
  TYPE,
  _decryptMessage
}
