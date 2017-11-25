import * as openpgp from 'openpgp'

const TYPE = {
  encrypt_msg: 'ENCRYPT_MSG'
}

const _encryptMessage = data => dispatch => {
  let options = {
    publicKeys: openpgp.key.readArmored(data.pubKey).keys,
    data: data.message
  }
  return openpgp.encrypt(options)
  .then( cyphertext => dispatch({type: TYPE.encrypt_msg, payload: cyphertext.data}) )
}

export default {
  TYPE,
  _encryptMessage
}
