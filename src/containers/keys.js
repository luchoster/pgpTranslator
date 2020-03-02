import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentIcon from '@material-ui/icons/FileCopy'
import SaveIcon from '@material-ui/icons/Save'
import RemoveIcon from '@material-ui/icons/DeleteForever'
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Fab,
  ListSubheader,
  Paper,
} from '@material-ui/core'
import { notNilOrEmpty, getKeys, setKeys, removeKeys } from '../lib/helpers'

const GeneratedKeys = props => (
  <article className="keys-wrapper">
    <ListSubheader className="page-title">Your New Keys</ListSubheader>
    <Paper className="keys-container" style={{ padding: 20 }}>
      <pre className="generated-key">{props.keys.publicKeyArmored}</pre>
      <Divider style={{ marginBottom: 20, width: '100%' }} />
      <pre className="generated-key">{props.keys.privateKeyArmored}</pre>
    </Paper>
    <Fab
      aria-label="Add"
      onClick={props.addKeys}
      style={{
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
      }}
    >
      <SaveIcon />
    </Fab>
  </article>
)

const CopyButtons = props => (
  <BottomNavigation value="0" style={styles.styleNav} showLabels>
    <CopyToClipboard text={props.publicKeyArmored}>
      <BottomNavigationAction
        className="align-self-end copy-btns"
        label="Copy Public Key"
        icon={<ContentIcon />}
      />
    </CopyToClipboard>
    <CopyToClipboard text={props.privateKeyArmored}>
      <BottomNavigationAction
        className="align-self-end copy-btns"
        color="primary"
        label="Copy Private Key"
        icon={<ContentIcon />}
      />
    </CopyToClipboard>
  </BottomNavigation>
)

class SavedKeys extends React.Component {
  state = {
    keygen: {
      privateKeyArmored: '',
      publicKeyArmored: '',
    },
    added: false,
    clearKeys: false,
    generatingKeys: notNilOrEmpty(this.props.location.state)
      ? this.props.location.state.generatingKeys
      : false,
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.keys, this.props.keys)
    if (!R.equals(prevProps.location.state, this.props.location.state))
      this.setState({
        generatingKeys: this.props.location.state.generatingKeys,
      })
    if (!R.equals(prevProps.keys, this.props.keys)) this._loadKeys()
  }

  componentDidMount() {
    this._loadKeys()
  }

  _loadKeys = () => {
    return getKeys().then(keygen => {
      this.setState({
        keygen,
        added: notNilOrEmpty(keygen) ? true : false,
        clearKeys: false,
      })
    })
  }

  _addKeys = keygen => {
    const armorKeys = {
      privateKeyArmored: keygen.privateKeyArmored,
      publicKeyArmored: keygen.publicKeyArmored,
    }

    getKeys().then(keys => {
      setKeys(armorKeys)
      this.setState({ added: true, keygen: armorKeys, clearKeys: false })
    })
  }

  _removeKeys = () => {
    getKeys().then(() => {
      removeKeys()
      this.setState({
        added: false,
        keygen: {
          privateKeyArmored: '',
          publicKeyArmored: '',
        },
        generatingKeys: false,
        clearKeys: true,
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.added ? (
          <div className="keys-wrapper">
            <ListSubheader className="page-title">
              Your Saved Keys
            </ListSubheader>
            <Paper
              className="keys-container"
              style={{ padding: '20px 10px 20px 0', marginBottom: -1 }}
            >
              <pre className="col-sm-12 generated-key">
                {this.state.keygen.publicKeyArmored}
              </pre>
              <div
                className="row align-items-center"
                style={{ height: '50px' }}
              >
                <Divider className="hide-sm-up col" />
              </div>
              <pre className="col-sm-12 generated-key">
                {this.state.keygen.privateKeyArmored}
              </pre>
              <CopyButtons {...this.state.keygen} />
            </Paper>
            <Fab
              aria-label="Remove"
              onClick={this._removeKeys}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                bottom: 20,
              }}
            >
              <RemoveIcon />
            </Fab>
          </div>
        ) : notNilOrEmpty(this.props.keys) && !this.state.clearKeys ? (
          <GeneratedKeys
            keys={this.props.keys}
            addKeys={() => this._addKeys(this.props.keys)}
          />
        ) : this.state.generatingKeys ? (
          <div className="row align-items-center full-height justify-content-center">
            <Paper className="padding20">
              <h3 className="text-center">
                Please wait while we generate your new keys...
              </h3>
            </Paper>
          </div>
        ) : (
          <div className="row align-items-center full-height justify-content-center">
            <Paper className="padding20">
              <h3 className="text-center">
                Please generate new keys (press the KeyGen button), and add them
                to your keychain
              </h3>
            </Paper>
          </div>
        )}
      </div>
    )
  }
}

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
  },
}

const mapStateToProps = state => ({
  keys: state.keys,
})

export default connect(
  mapStateToProps,
  null
)(SavedKeys)
