import React           from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentIcon     from 'material-ui-icons/ContentCopy'
import {
  BottomNavigation,
  BottomNavigationButton
} from 'material-ui'

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: '0'
  }
}

const CopyMessageBtn = props =>
  <BottomNavigation value="0" hidden={props.hidden} style={styles.styleNav} showLabels>
    <CopyToClipboard text={props.message}>
      <BottomNavigationButton
        className="align-self-end copy-btns"
        label="Copy Message"
        icon={<ContentIcon />}
      />
    </CopyToClipboard>
  </BottomNavigation>

export default CopyMessageBtn
