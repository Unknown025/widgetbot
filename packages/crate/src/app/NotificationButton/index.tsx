import * as React from 'react'
import { connect } from 'react-redux'

import { toggleNotifications } from '../../store/actions'
import { State } from '../../types/store'
import { Icons, Root } from './elements'

interface DispatchProps {
  onToggleNotifications: () => void
}

interface StateProps {
  notifications: boolean
}

class NotificationButton extends React.PureComponent<StateProps & DispatchProps> {
  render() {
    const { onToggleNotifications, notifications } = this.props

    return (
      <Root onClick={onToggleNotifications} className="button">
        <Icons.Root className="icons">
          {notifications ? <Icons.NotificationsOnButton className="enable" /> : <Icons.NotificationsOffButton className="disable" />}
        </Icons.Root>
      </Root>
    )
  }
}

export default connect<StateProps, DispatchProps, {}, State>(
  ({ showNotifications }) => ({
    notifications: showNotifications
  }),
  dispatch => ({
    onToggleNotifications: () => dispatch(toggleNotifications(null))
  })
)(NotificationButton)
