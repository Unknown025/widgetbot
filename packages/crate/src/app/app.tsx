import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { connect } from 'react-redux'

import Options from '../types/options'
import { State } from '../types/store'
import Theme from '../types/theme'
import { getCoords } from '../util/parse'
import Button from './Button'
import { Root } from './elements'
import Embed from './Embed'
import NotificationButton from './NotificationButton'
import Notifications from './Notifications'

interface StateProps {
  options: Options
  open: boolean
  visible: boolean
  showNotifications: boolean
}

class App extends React.Component<StateProps> {
  getTheme = (): Theme => ({
    options: this.props.options,
    coords: getCoords(this.props.options.location),
    open: this.props.open,
    visible: this.props.visible
  })

  render() {
    const { options, open, showNotifications } = this.props

    return (
      <ThemeProvider theme={this.getTheme()}>
        <Root className="root">
          <Embed />
          {options.notifications && showNotifications && !open && <Notifications />}
          <NotificationButton />
          <Button />
        </Root>
      </ThemeProvider>
    )
  }
}

export default connect<StateProps, {}, {}, State>(({ visible, options, open, showNotifications }) => ({
  options,
  visible,
  open,
  showNotifications
}))(App)
