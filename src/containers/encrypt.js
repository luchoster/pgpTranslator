import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  ListSubheader,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
} from '@material-ui/core'
import { notNilOrEmpty } from '../lib/helpers'
import { Encrypt } from '../actions'
import CopyMessageBtn from '../components/copyMessageBtn'

class EncryptPage extends React.Component {
  state = {
    encryptedSuccess: false,
    message: '',
    pubKey: '',
    stepIndex: 0,
  }

  componentWillUnmount() {
    this.setState({
      message: '',
    })
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

  handleEncrypt = data => {
    this.props.encryptMsg(data)
    this.setState({
      stepIndex: 2,
      encryptedSuccess: true,
    })
  }

  render() {
    const { stepIndex } = this.state
    const data = {
      pubKey: this.state.pubKey,
      message: this.state.message,
    }
    return (
      <div>
        <ListSubheader className="page-title">Encrypt Messages</ListSubheader>
        <Stepper orientation="vertical" activeStep={stepIndex}>
          <Step>
            <StepLabel onClick={() => this.handleSteps(0)}>
              Enter the Public Key of whom you're seinding the message to
            </StepLabel>
            <StepContent>
              <TextField
                id="pubKey"
                name="pubKey"
                label="Public Key"
                fullWidth
                multiline
                onChange={this.handleInputChanges}
                value={this.state.pubKey}
                rowsMax={8}
                required
                margin="normal"
              />
              <Button
                className="btn"
                onClick={this.handleNext}
                variant="raised"
                color="primary"
                disabled={R.isEmpty(this.state.pubKey) ? true : false}
              >
                Next
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              onClick={() =>
                notNilOrEmpty(this.state.pubKey) && this.handleSteps(1)
              }
            >
              Message you want to Encrypt
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
                onClick={() => this.handleEncrypt(data)}
              >
                Encrypt
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              onClick={() =>
                notNilOrEmpty(this.state.message) && this.handleSteps(2)
              }
            >
              Encrypted Message
            </StepLabel>
            <StepContent>
              <TextField
                id="encryptedMsg"
                disabled
                multiline
                rowsMax={8}
                value={
                  notNilOrEmpty(this.props.encrypted)
                    ? this.props.encrypted
                    : ''
                }
                fullWidth
              />
            </StepContent>
          </Step>
        </Stepper>
        <CopyMessageBtn
          message={this.props.encrypted}
          hidden={R.not(this.state.encryptedSuccess)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  encrypted: state.encrypt,
})

const mapDispatchToProps = dispatch => ({
  encryptMsg: data => dispatch(Encrypt._encryptMessage(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EncryptPage)
