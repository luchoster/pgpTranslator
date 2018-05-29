import React from 'react'
import { Link } from 'react-router-dom'
import { LockOpen, LockOutline, VpnKey } from '@material-ui/icons'
import { Button } from '@material-ui/core'

class Home extends React.Component {
  render() {
    return (
      <div className="row justify-content-center home-container">
        <section className="align-self-center">
          <Link to="/encrypt">
            <Button variant="raised" className="col-sm-10 btn--home">
              <LockOutline />
              Encrypt Message
            </Button>
          </Link>
          <Link to="/decrypt">
            <Button variant="raised" className="col-sm-10 btn--home">
              <LockOpen />
              Decrypt Message
            </Button>
          </Link>
          <Link to="/keys">
            <Button variant="raised" className="col-sm-10 btn--home">
              <VpnKey />
              Saved Keys
            </Button>
          </Link>
        </section>
      </div>
    )
  }
}

export default Home
