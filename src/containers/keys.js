import * as R          from 'ramda'
import React           from 'react'
import { connect }     from 'react-redux'
import Subheader       from 'material-ui/List/ListSubheader'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentIcon     from 'material-ui-icons/ContentCopy'
import AddIcon         from 'material-ui-icons/Add'
import {
  BottomNavigation,
  BottomNavigationButton,
  Button,
  Divider,
  Paper
} from 'material-ui'
import {
  notNilOrEmpty,
  getKeys,
  setKeys,
} from '../lib/helpers'

const GeneratedKeys = (props) =>
  <article>
    <Button
      color="primary"
      raised
      fab
      onTouchTap={props.addKeys}
      >
        <AddIcon />
    </Button>
    <Subheader className="page-title">Your New Keys</Subheader>
    <Paper className="row keys-container" style={{padding: '20px 0'}}>
      <pre className="col-sm-12 generated-key">
        {props.keys.publicKeyArmored}
      </pre>
      <Divider className="hide-sm-up" />
      <pre className="col-sm-12 generated-key">
        {props.keys.privateKeyArmored}
      </pre>
    </Paper>
  </article>

const CopyButtons = props =>
  <BottomNavigation value="0" style={styles.styleNav} showLabels>
    <CopyToClipboard text={props.publicKeyArmored}>
      <BottomNavigationButton
        className="align-self-end copy-btns"
        label="Copy Public Key"
        icon={<ContentIcon />}
      />
    </CopyToClipboard>
    <CopyToClipboard text={props.privateKeyArmored}>
      <BottomNavigationButton
        className="align-self-end copy-btns"
        color="primary"
        label="Copy Private Key"
        icon={<ContentIcon />}
      />
    </CopyToClipboard>
  </BottomNavigation>

class SavedKeys extends React.Component {
  state = {
    keygen: {
      privateKeyArmored: '',
      publicKeyArmored: ''
    },
    added: false
  }

  componentDidUpdate(prevProps) {
    if(!R.equals(prevProps.keys, this.props.keys))
      this._loadKeys()
  }

  componentWillMount() {
    this._loadKeys()
  }

  _loadKeys = () => {
    return getKeys()
      .then(keygen => {
        this.setState({
          keygen,
          added: notNilOrEmpty(keygen) ? true : false
        })
      })
  }

  _addKeys = (keygen) => {
    const armorKeys = {
      privateKeyArmored: keygen.privateKeyArmored,
      publicKeyArmored : keygen.publicKeyArmored
    }

    getKeys()
      .then( keys => {
        setKeys(armorKeys)
      }, this.setState({added: true})
      )
  }

  render() {
    return(
      <div>
        {
          notNilOrEmpty(this.state.keygen.privateKeyArmored) ?
            <div>
              <Subheader className="page-title">Your Saved Keys</Subheader>
              <Paper className="row keys-container" style={{padding: '20px 10px 0 0', marginBottom:-1 }}>
                <pre className="col-sm-12 generated-key">
                  {this.state.keygen.publicKeyArmored}
                </pre>
                <Divider className="hide-sm-up" />
                <pre className="col-sm-12 generated-key">
                  {this.state.keygen.privateKeyArmored}
                </pre>
              </Paper>
              <CopyButtons {...this.state.keygen} />
            </div>
          :
            notNilOrEmpty(this.props.keys) ?
              <GeneratedKeys keys={this.props.keys} addKeys={() => this._addKeys(this.props.keys)} />
            :
              <div className="row align-items-center full-height justify-content-center">
                <Paper className="padding20">
                  <h3 className='text-center'>Please generate new keys (press the KeyGen button), and add them to your keychain</h3>
                </Paper>
              </div>
        }
      </div>
    )
  }
}

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: '0'
  }
}

const mapStateToProps = state => ({
  keys: state.keys
})

export default connect(mapStateToProps, null)(SavedKeys)
