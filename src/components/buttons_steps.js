import * as R from 'ramda'
import React from 'react'
import { Button } from 'material-ui'

const renderStepActions = (props) => {
  return (
    <section>
      <Button onTouchTap={props.handlePrev} >
        Back
      </Button>
      <Button
        className="btn"
        raised
        color="primary"
        disabled={ props.msgEncrypted }
        onTouchTap={
          props.step === 1 ?
            props.handleEncrypt
          :
            props.handleNext
        }
        >
        Next
      </Button>
    </section>
  )
}

export default renderStepActions
