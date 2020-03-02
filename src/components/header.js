import React from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import { LockOutlined, LockOpen, VpnKey, Security } from '@material-ui/icons'
import KeyGen from '../components/keygen'
import {
  AppBar,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
  Button,
  SwipeableDrawer,
} from '@material-ui/core'

class Header extends React.Component {
  state = {
    keyDialog: false,
    drawer: false,
  }

  toggleDrawer = e => {
    this.setState({
      drawer: !this.state.drawer,
    })
  }

  openKeyDialog = e => {
    e.preventDefault()
    this.setState({ keyDialog: true, drawer: false })
  }

  closeKeyDialog = () => {
    this.setState({ keyDialog: false })
  }

  render() {
    return (
      <div>
        <AppBar position="static" className="app-bar">
          <Toolbar>
            <IconButton aria-label="Menu">
              <MenuIcon onClick={this.toggleDrawer} />
            </IconButton>
            <Typography type="title" style={{ flex: 1 }}>
              PGP Translator
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={this.openKeyDialog}
            >
              KeyGen
            </Button>
            <KeyGen
              keyNames={options => this.props.generateKeys(options)}
              open={this.state.keyDialog}
              close={this.closeKeyDialog}
            />
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={this.state.drawer}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
        >
          <ListSubheader component="div">Main Menu</ListSubheader>
          <Divider />
          <ListItem button onClick={this.openKeyDialog}>
            <ListItemIcon>
              <VpnKey />
            </ListItemIcon>
            <ListItemText primary="Generate New Keys" />
          </ListItem>
          <Divider />
          <div onClick={this.toggleDrawer}>
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
          </div>
          <Divider />
          <div onClick={this.toggleDrawer}>
            <Link to="/encrypt">
              <ListItem button>
                <ListItemIcon>
                  <LockOutlined />
                </ListItemIcon>
                <ListItemText primary="Encrypt" />
              </ListItem>
            </Link>
          </div>
          <Divider />
          <div onClick={this.toggleDrawer}>
            <Link to="/decrypt">
              <ListItem button>
                <ListItemIcon>
                  <LockOpen />
                </ListItemIcon>
                <ListItemText primary="Decrypt" />
              </ListItem>
            </Link>
          </div>
          <Divider />
          <div onClick={this.toggleDrawer}>
            <Link
              to={{
                pathname: '/keys',
                state: { generatingKeys: false },
              }}
            >
              <ListItem button>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText primary="Display Keys" />
              </ListItem>
            </Link>
          </div>
          <Divider />
        </SwipeableDrawer>
      </div>
    )
  }
}

export default Header
