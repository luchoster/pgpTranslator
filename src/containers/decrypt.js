import * as R       from 'ramda'
import React        from 'react'
import { connect }  from 'react-redux'
import * as openpgp from 'openpgp'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Snackbar,
  TextField,
}                        from 'material-ui'
import Subheader         from 'material-ui/List/ListSubheader'
import { Decrypt, Keys }       from '../actions'
import { notNilOrEmpty } from '../lib/helpers'

class DecryptPage extends React.Component{
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
    if(this.props.keys.privateKeyArmored)
      this.setState({
        privateKeyArmored: this.props.keys.privateKeyArmored
      })
  }

  componentDidUpdate(prevProps) {
    if(!R.equals(prevProps.keys, this.props.keys)) {
      this.props.getSavedKeys()
      if(this.props.keys.privateKeyArmored)
        this.setState({
          privateKeyArmored: this.props.keys.privateKeyArmored
        })
    }
  }

  handleSteps = (step) => {
    this.setState({
      stepIndex: step
    })
  }

  handleNext = () => {
    if (this.state.stepIndex < 2) {
      this.setState({stepIndex: this.state.stepIndex + 1})
    }
  }

  handlePrev = () => {
    if (this.state.stepIndex > 0) {
      this.setState({stepIndex: this.state.stepIndex - 1})
    }
  }

  handleInputChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // handleMessage = (e) => {
  //   if (openpgp.message.readArmored(e.target.value)) {
  //     let msg = openpgp.message.readArmored(e.target.value)
  //     this.setState({
  //       message: msg
  //     })
  //   } else {
  //     alert('nope')
  //   }

  // }

  handleDecrypt = data => {
    this.props.decryptMsg(data)
    this.setState({stepIndex: 2, decryptedSuccess: true})
  }

  clearPrivKey = () => this.setState({privateKeyArmored : ''})

  handlePassphraseDialog = () => this.setState({
    passphraseDialog: !this.state.passphraseDialog
  })

  closeSnackbar = () => this.setState({
    openSnackbar: false
  })

  decryptKey = (e) => {
      e.preventDefault()

      const privateKey = openpgp.key.readArmored(this.state.privateKeyArmored).keys[0]
      const isLegitKey = privateKey.decrypt(this.state.passphrase)

      if (isLegitKey) {
        this.setState({
          stepIndex: 1,
          privateKey: privateKey
        })
      } else {
        this.setState({
          openSnackbar: true
        })
      }
  }

  render() {
    const {stepIndex} = this.state;
    const data = {
      privateKey: this.state.privateKey,
      message: this.state.message
    }
    return(
      <div>
        <Snackbar
          open={this.state.openSnackbar}
          message="Wrong Passphrase"
          autoHideDuration="4000"
          onRequestClose={this.closeSnackbar}
        />
        <Dialog
          open={this.state.passphraseDialog}
          onRequestClose={this.handlePassphraseDialog}
          >
          <DialogTitle className="text-center">Enter your Passphrase</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the passphrase of your Private Key
            </DialogContentText>
            <form onSubmit={this.decryptKey}>
              <TextField
                fullWidth
                label='Passphrase'
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
                  onTouchTap={this.handlePassphraseDialog}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  color="primary"
                  onTouchTap={this.handlePassphraseDialog}
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        <Subheader className="page-title">Decrypt Messages</Subheader>
        <Stepper orientation="vertical" activeStep={stepIndex}>
          <Step>
            <StepLabel onTouchTap={() => this.handleSteps(0)}>
              Enter the Private Key to decrypt
            </StepLabel>
            <StepContent>
              <TextField
                id='privateKeyArmored'
                name='privateKeyArmored'
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
                onTouchTap={this.clearPrivKey}
                raised color="accent"
                >
                Clear
              </Button>
              <Button
                className="btn col-6"
                onTouchTap={this.handlePassphraseDialog}
                raised color="primary"
                disabled={ R.isEmpty(this.state.privateKeyArmored) ? true : false }
                >
                Next
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onTouchTap={ () => notNilOrEmpty(this.state.privateKey) && this.handleSteps(1) }>
              Message you want to Decrypt
            </StepLabel>
            <StepContent>
              <TextField
                id='message'
                name='message'
                label="Message"
                fullWidth
                multiline
                onChange={this.handleInputChanges}
                value={this.state.message}
                rowsMax={8}
                required
                margin="normal"
              />
              <Button
                onTouchTap={this.handlePrev}
              >
                Back
              </Button>
              <Button
                className="btn"
                raised
                color="primary"
                disabled={ R.isEmpty(this.state.message) ? true : false }
                onTouchTap={() => this.handleDecrypt(data)}
              >
                Decrypt
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel onTouchTap={ () => notNilOrEmpty(this.state.message) && this.handleSteps(2) }>
              Decrypted Message
            </StepLabel>
            <StepContent>
              <TextField
                id='encryptedMsg'
                disabled
                multiline
                rowsMax={8}
                value={notNilOrEmpty(this.props.decrypt) ? this.props.decrypt : ''}
                fullWidth
              />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  keys: state.keys,
  decrypt: state.decrypt
})

const mapDispatchToProps = dispatch => ({
  getSavedKeys: () => dispatch(Keys.savedKeys()),
  decryptMsg: (data) => dispatch(Decrypt._decryptMessage(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(DecryptPage)

