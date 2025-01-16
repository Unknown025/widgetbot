import createCache from '@emotion/cache'
import { API } from '@widgetbot/react-embed'
import { cx } from 'emotion'
import * as React from 'react'
import { connect } from 'react-redux'
import ShadowDOM from 'react-shadow'
import { stylis } from '../api/embedAPI'
import { State } from '../types/store'
import App from './app'
import { CacheProvider } from '@emotion/core'

export const APIContext = React.createContext(null)

interface OwnProps {
  onAPI: (api: API) => void
}

interface StateProps {
  css: string
  interactive: boolean
  open: boolean
}

class Controller extends React.Component<StateProps & OwnProps> {
  state = {
    emotionCache: null,
    id: `crate-${Math.random()
      .toString(36)
      .substring(2, 9)}`
  }

  registerEmotion = (styleInjection: HTMLDivElement) => {
    this.setState({
      emotionCache: createCache({
        container: styleInjection
      })
    })
  }

  shadowDOM(props) {
    const children = <shadow-root>{props.children}</shadow-root>
    const supported = !!((document.head as any).createShadowRoot || document.head.attachShadow)

    return supported ? <ShadowDOM>{children}</ShadowDOM> : children
  }

  render() {
    const { id } = this.state
    const { css, onAPI, interactive, open } = this.props

    const styles = stylis(`.${id}`, css)

    return (
      <this.shadowDOM>
        <div
          className={cx(id, {
            interactive,
            open
          })}
        >
          <shadow-styles ref={this.registerEmotion}>
            <style>{styles}</style>
          </shadow-styles>
          {this.state.emotionCache && (
            <CacheProvider value={this.state.emotionCache}>
              <APIContext.Provider value={onAPI}>
                <App />
              </APIContext.Provider>
            </CacheProvider>
          )}
        </div>
      </this.shadowDOM>
    )
  }
}

export default connect<StateProps, {}, {}, State>(({ interactive, open, options }) => ({
  css: options.css,
  interactive,
  open
}))(Controller)
