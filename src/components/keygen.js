import * as R from 'ramda'
import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core'

class KeyGen extends React.Component {
  state = {
    // multiple user IDs
    userIds: [
      {
        name: '',
      },
    ],
    numBits: 4096, // RSA key size
    passphrase: '', // protects the private key
  }

  handleInputChanges = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  generateKeysAndRedirect = options => {
    const location = {
      pathname: '/keys',
      state: { generatingKeys: true },
    }

    this.props.history.push(location)
    this.props.keyNames(options)
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.close}>
        <DialogTitle className="text-center">Generate New Keys</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a passphrase to protect your Private Key
          </DialogContentText>
          <form
            onSubmit={e => {
              e.preventDefault()
              this.generateKeysAndRedirect(this.state)
            }}
          >
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
              <Button onClick={this.props.close}>Cancel</Button>
              <Button
                type="submit"
                color="primary"
                disabled={R.isEmpty(this.state.passphrase) ? true : false}
                onClick={this.props.close}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withRouter(KeyGen)
