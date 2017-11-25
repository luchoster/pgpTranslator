import React      from 'react'
import { Link }   from 'react-router-dom'
import {
  LockOpen,
  LockOutline,
  VpnKey
} from 'material-ui-icons'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui'

class Home extends React.Component {
  render() {
    return(
      <div className="row justify-content-center home-container">
        <section className="align-self-center">
          <List>
            <Link to='/encrypt' className="col-sm-12">
              <ListItem button>
                <ListItemIcon>
                  <LockOutline />
                </ListItemIcon>
                <ListItemText primary="Encrypt Message" />
              </ListItem>
            </Link>
            <Link to='/decrypt' className="col-sm-12">
              <ListItem button>
                <ListItemIcon>
                  <LockOpen />
                </ListItemIcon>
                <ListItemText primary="Decrypt Message" />
              </ListItem>
            </Link>
            <Link to='/keys' className="col-sm-12">
              <ListItem button>
                <ListItemIcon>
                  <VpnKey />
                </ListItemIcon>
                <ListItemText primary="Saved Keys" />
              </ListItem>
            </Link>
          </List>
        </section>
      </div>
    )
  }
}

export default Home
