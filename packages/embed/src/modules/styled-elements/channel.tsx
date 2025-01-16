import { connect } from 'fluent'
import * as React from 'react'
import styled from 'typed-emotion'

// prettier-ignore
export const Hash = styled.div`
  background-position: 50%;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3e%3cpath fill='${({ theme }) => encodeURIComponent(theme.colors._primary.fadeOut(0.6).toString())}' d='M3.6 14l.5-2.7H1.4l.2-1.3h2.7L5 6H2.4l.2-1.3h2.7L5.7 2h1.4l-.5 2.7h4L11 2h1.3l-.5 2.7h2.7L14.4 6h-2.7l-.7 4h2.6l-.2 1.3h-2.7l-.4 2.7H8.9l.5-2.7h-4L5 14H3.6zm2.8-8l-.8 4h4l.8-4h-4z'/%3e%3c/svg%3e");
`

// prettier-ignore
export const MegaphoneIcon = styled.div`
  background-position: 50%;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3e%3cpath fill='${({ theme }) => encodeURIComponent(theme.colors._primary.fadeOut(0.6).toString())}' d='M3.9 8.26H2V15.2941H3.9V8.26Z M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V4H19.1ZM9.2181 17.9944L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9944Z'/%3e%3c/svg%3e");
`

export const NotificationsOffIcon = styled.div`
  cursor: pointer;
  background-position: 50%;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3e%3cpath fill='${({
    theme
  }) =>
    encodeURIComponent(
      theme.colors._primary.fadeOut(0.6).toString()
    )}' d='M1.3 21.3a1 1 0 1 0 1.4 1.4l20-20a1 1 0 0 0-1.4-1.4l-20 20ZM3.13 16.13c.11.27.46.28.66.08L15.73 4.27a.47.47 0 0 0-.07-.74 6.97 6.97 0 0 0-1.35-.64.62.62 0 0 1-.38-.43 2 2 0 0 0-3.86 0 .62.62 0 0 1-.38.43A7 7 0 0 0 5 9.5v2.09a.5.5 0 0 1-.13.33l-1.1 1.22A3 3 0 0 0 3 15.15v.28c0 .24.04.48.13.7ZM18.64 9.36c.13-.13.36-.05.36.14v2.09c0 .12.05.24.13.33l1.1 1.22a3 3 0 0 1 .77 2.01v.28c0 .67-.34 1.29-.95 1.56-1.31.6-4 1.51-8.05 1.51-.46 0-.9-.01-1.33-.03a.48.48 0 0 1-.3-.83l8.27-8.28ZM9.18 19.84A.16.16 0 0 0 9 20a3 3 0 1 0 6 0c0-.1-.09-.17-.18-.16a24.84 24.84 0 0 1-5.64 0Z'/%3e%3c/svg%3e");
`

export const NotificationsOnIcon = styled.div`
  cursor: pointer;
  background-position: 50%;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3e%3cpath fill='white' d='M9.7 2.89c.18-.07.32-.24.37-.43a2 2 0 0 1 3.86 0c.05.2.19.36.38.43A7 7 0 0 1 19 9.5v2.09c0 .12.05.24.13.33l1.1 1.22a3 3 0 0 1 .77 2.01v.28c0 .67-.34 1.29-.95 1.56-1.31.6-4 1.51-8.05 1.51-4.05 0-6.74-.91-8.05-1.5-.61-.28-.95-.9-.95-1.57v-.28a3 3 0 0 1 .77-2l1.1-1.23a.5.5 0 0 0 .13-.33V9.5a7 7 0 0 1 4.7-6.61ZM9.18 19.84A.16.16 0 0 0 9 20a3 3 0 1 0 6 0c0-.1-.09-.17-.18-.16a24.86 24.86 0 0 1-5.64 0Z'/%3e%3c/svg%3e");
`

interface Props {
  id: string
  className?: string
}

/**
 * Routable channel
 */
const Channel = connect<Props>()
  .with(({ state, signals, props }) => ({
    switchChannel: signals.switchChannel
  }))
  .toClass(
    props =>
      class Channel extends React.PureComponent<typeof props> {
        url: string

        componentWillMount() {
          this.url = this.getUrl()
        }

        getUrl() {
          const { id } = this.props
          const path = location.pathname.split('/')

          return path.length > 5 ? id : `/channels/${path[2]}/${id}/`
        }

        handleClick = (e: Event) => {
          const { switchChannel, id } = this.props
          e.preventDefault()

          history.pushState(null, null, this.url)

          switchChannel({
            channel: id
          })
        }

        render() {
          return (
            <a
              href={this.url}
              {...{
                className: this.props.className,
                children: this.props.children
              }}
              onClick={this.handleClick.bind(this)}
            />
          )
        }
      }
  )

export default Channel
