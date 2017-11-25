import React                             from 'react'
import { Link }                          from 'react-router-dom'
import MenuIcon                          from 'material-ui-icons/Menu'
import HomeIcon                          from 'material-ui-icons/Home'
import { LockOutline, LockOpen, VpnKey, Security } from 'material-ui-icons/'
import Subheader                         from 'material-ui/List/ListSubheader'
import KeyGen                            from '../components/keygen'
import {
  AppBar,
  Drawer,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button
} from 'material-ui'

class Header extends React.Component {
  state = {
    keyDialog: false,
    drawer: false
  }

  openDrawer = (e) => {
    e.preventDefault()
    this.setState({
      drawer: true
    })
  }

  closeDrawer = () => {
    this.setState({
      drawer: false
    })
  }

  openKeyDialog = (e) => {
    e.preventDefault()
    this.setState({ keyDialog: true })
  }

  closeKeyDialog = () => {
    this.setState({ keyDialog: false })
  }

  render() {
    return(
      <div>
        <AppBar position="static" className="app-bar">
          <Toolbar>
            <IconButton onTouchTap={this.openDrawer} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" style={{flex: 1}}>
              PGP Translator
            </Typography>
            <Button onTouchTap={ this.openKeyDialog } color="contrast">KeyGen</Button>
            <KeyGen
              keyNames={(options) => this.props.generateKeys(options)}
              open={this.state.keyDialog}
              close={this.closeKeyDialog}
            />
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.drawer}
          onRequestClose={this.closeDrawer}
        >
          <Subheader>Main Menu</Subheader>
          <Divider />
            <ListItem button onTouchTap={this.openKeyDialog}>
              <ListItemIcon>
                <VpnKey />
              </ListItemIcon>
              <ListItemText primary="Generate New Keys" />
            </ListItem>
          <Divider />
          <Link to='/' onClick={this.closeDrawer}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Divider />
          <Link to='/encrypt' onClick={this.closeDrawer}>
            <ListItem button>
              <ListItemIcon>
                <LockOutline />
              </ListItemIcon>
              <ListItemText primary="Encrypt" />
            </ListItem>
          </Link>
          <Divider />
          <Link to='/decrypt' onClick={this.closeDrawer}>
            <ListItem button>
              <ListItemIcon>
                <LockOpen />
              </ListItemIcon>
              <ListItemText primary="Decrypt" />
            </ListItem>
          </Link>
          <Divider />
          <Link to='/keys' onClick={this.closeDrawer}>
            <ListItem button>
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText primary="Display Keys" />
            </ListItem>
          </Link>
          <Divider />
        </Drawer>
      </div>
    )
  }
}

export default Header
