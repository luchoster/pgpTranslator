import * as openpgp from 'openpgp'

const TYPE = {
  encrypt_msg: 'ENCRYPT_MSG',
}

const _encryptMessage = data => async dispatch => {
  let options = {
    publicKeys: (await openpgp.key.readArmored(data.pubKey)).keys,
    message: openpgp.message.fromText(data.message),
  }
  console.log(data)
  return openpgp
    .encrypt(options)
    .then(cyphertext =>
      dispatch({ type: TYPE.encrypt_msg, payload: cyphertext.data })
    )
}

export default {
  TYPE,
  _encryptMessage,
}
