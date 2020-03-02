import React from 'react'
import { Link } from 'react-router-dom'
import { LockOpen, LockOutlined, VpnKey } from '@material-ui/icons'
import { Button } from '@material-ui/core'

class Home extends React.Component {
  render() {
    return (
      <div className="row justify-content-center home-container">
        <section className="align-self-center flex-column d-flex align-items-center">
          <Link to="/encrypt">
            <Button
              variant="contained"
              size="large"
              className="btn--home"
              startIcon={<LockOutlined />}
            >
              Encrypt Message
            </Button>
          </Link>
          <Link to="/decrypt">
            <Button
              variant="contained"
              size="large"
              className="btn--home"
              startIcon={<LockOpen />}
            >
              Decrypt Message
            </Button>
          </Link>
          <Link to="/keys">
            <Button
              variant="contained"
              size="large"
              className="btn--home"
              startIcon={<VpnKey />}
            >
              Saved Keys
            </Button>
          </Link>
        </section>
      </div>
    )
  }
}

export default Home
