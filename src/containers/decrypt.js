import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as openpgp from 'openpgp'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListSubheader,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Snackbar,
  TextField,
} from '@material-ui/core'
import { Decrypt, Keys } from '../actions'
import { notNilOrEmpty } from '../lib/helpers'
import CopyMessageBtn from '../components/copyMessageBtn'

class DecryptPage extends React.Component {
  state = {
    openSnackbar: false,
    decryptedSuccess: false,
    passphraseDialog: false,
    passphrase: '',
    message: '',
    privateKey: '',
    privateKeyArmored: '',
    decryptedMessage: '',
    stepIndex: 0,
  }

  componentDidMount() {
    this.props.getSavedKeys()
    if (this.props.keys.privateKeyArmored)
      this.setState({
        privateKeyArmored: this.props.keys.privateKeyArmored,
      })
  }

  componentDidUpdate(prevProps) {
    if (!R.equals(prevProps.keys, this.props.keys)) {
      this.props.getSavedKeys()
      if (this.props.keys.privateKeyArmored)
        this.setState({
          privateKeyArmored: this.props.keys.privateKeyArmored,
        })
    }
  }

  handleSteps = step => {
    this.setState({
      stepIndex: step,
    })
  }

  handleNext = () => {
    if (this.state.stepIndex < 2) {
      this.setState({ stepIndex: this.state.stepIndex + 1 })
    }
  }

  handlePrev = () => {
    if (this.state.stepIndex > 0) {
      this.setState({ stepIndex: this.state.stepIndex - 1 })
    }
  }

  handleInputChanges = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  clearPrivKey = () => this.setState({ privateKeyArmored: '' })

  handlePassphraseDialog = () =>
    this.setState({
      passphraseDialog: !this.state.passphraseDialog,
    })

  closeSnackbar = () =>
    this.setState({
      openSnackbar: false,
    })

  decryptKey = async e => {
    e.preventDefault()
    let isLegitKey = null

    const privateKey = (await openpgp.key.readArmored(
      this.state.privateKeyArmored
    )).keys[0]

    try {
      await privateKey.decrypt(this.state.passphrase)
      isLegitKey = true
    } catch (e) {
      isLegitKey = false
    }

    if (isLegitKey) {
      this.setState({
        stepIndex: 1,
        privateKey: privateKey,
      })
    } else {
      this.setState({
        openSnackbar: true,
      })
    }
  }

  handleDecrypt = data => {
    if (!this.state.message.startsWith('-----BEGIN PGP MESSAGE-----')) {
      alert("That's not a valid PGP Message. Try again")
    } else {
      this.props.decryptMsg(data)
      this.setState({ stepIndex: 2, decryptedSuccess: true })
    }
  }

  render() {
    const { stepIndex } = this.state
    const data = {
      privateKey: this.state.privateKey,
      message: this.state.message,
    }
    return (
      <div>
        <Snackbar
          open={this.state.openSnackbar}
          message={<span id="message-id">Wrong Passphrase</span>}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={4000}
          onClose={this.closeSnackbar}
        />
        <Dialog
          open={this.state.passphraseDialog}
          onClose={this.handlePassphraseDialog}
        >
          <DialogTitle className="text-center">
            Enter your Passphrase
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the passphrase of your Private Key
            </DialogContentText>
            <form onSubmit={this.decryptKey}>
              <TextField
                fullWidth
                label="Passphrase"
                margin="normal"
                multiline={true}
                name="passphrase"
                onChange={this.handleInputChanges}
                rowsMax={8}
                required
                value={this.state.passphrase}
              />
              <DialogActions>
                <Button
                  label="Cancel"
                  color="primary"
                  onClick={this.handlePassphraseDialog}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  onClick={this.handlePassphraseDialog}
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        <ListSubheader className="page-title">Decrypt Messages</ListSubheader>
        <Stepper orientation="vertical" activeStep={stepIndex}>
          <Step>
            <StepLabel onClick={() => this.handleSteps(0)}>
              Enter the Private Key to decrypt
            </StepLabel>
            <StepContent>
              <TextField
                id="privateKeyArmored"
                name="privateKeyArmored"
                label="Private Key"
                fullWidth
                multiline
                onChange={this.handleInputChanges}
                value={this.state.privateKeyArmored}
                rowsMax={8}
                required
                margin="normal"
              />
              <Button
                className="btn col-6"
                onClick={this.clearPrivKey}
                variant="raised"
              >
                Clear
              </Button>
              <Button
                className="btn col-6"
                onClick={this.handlePassphraseDialog}
                variant="raised"
                color="primary"
                disabled={
                  R.isEmpty(this.state.privateKeyArmored) ? true : false
                }
              >
                Next
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              onClick={() =>
                notNilOrEmpty(this.state.privateKey) && this.handleSteps(1)
              }
            >
              Message you want to Decrypt
            </StepLabel>
            <StepContent>
              <TextField
                id="message"
                name="message"
                label="Message"
                fullWidth
                multiline
                onChange={this.handleInputChanges}
                value={this.state.message}
                rowsMax={8}
                required
                margin="normal"
              />
              <Button onClick={this.handlePrev}>Back</Button>
              <Button
                className="btn"
                variant="raised"
                color="primary"
                disabled={R.isEmpty(this.state.message) ? true : false}
                onClick={() => this.handleDecrypt(data)}
              >
                Decrypt
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              onClick={() =>
                notNilOrEmpty(this.state.message) && this.handleSteps(2)
              }
            >
              Decrypted Message
            </StepLabel>
            <StepContent>
              <TextField
                id="encryptedMsg"
                disabled
                multiline
                rowsMax={8}
                value={
                  notNilOrEmpty(this.props.decrypt) ? this.props.decrypt : ''
                }
                fullWidth
              />
            </StepContent>
          </Step>
        </Stepper>
        <CopyMessageBtn
          message={this.props.decrypt}
          hidden={R.not(this.state.decryptedSuccess)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  keys: state.keys,
  decrypt: state.decrypt.decrypt_message,
  decrypt_error: state.decrypt.decrypt_error,
})

const mapDispatchToProps = dispatch => ({
  getSavedKeys: () => dispatch(Keys.savedKeys()),
  decryptMsg: data => dispatch(Decrypt._decryptMessage(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecryptPage)
