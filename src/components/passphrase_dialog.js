import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from 'material-ui'

class PassphraseDialog extends React.Component {
  render() {
    const props = this.props
    return (
      <Dialog
        open={props.passphraseDialog}
        onClose={props.handlePassphraseDialog}
      >
        <DialogTitle className="text-center">Enter your Passphrase</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the passphrase of your Private Key
          </DialogContentText>
          <form onSubmit={props.decryptKey}>
            <TextField
              fullWidth
              label="Passphrase"
              margin="normal"
              multiline={true}
              name="passphrase"
              onChange={props.handleInputChanges}
              rowsMax={8}
              required
              value={props.passphrase}
            />
            <DialogActions>
              <Button
                label="Cancel"
                color="primary"
                onClick={props.handlePassphraseDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="raised"
                onClose={props.handlePassphraseDialog}
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

export default PassphraseDialog
