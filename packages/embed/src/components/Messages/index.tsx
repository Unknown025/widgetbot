import { connect } from 'fluent'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { fetchInvite } from 'socket-io'
import { ScrollVisible } from 'styled-elements/scrollable'

import Header, { Name, Topic } from '../Header'
import { Join, Stretch } from '../Header/elements'
import { Loading, NoMessages } from '../Overlays'
import ErrorAhoy from '../Overlays/ErrorAhoy'
import Wrapper from '../Wrapper'
import Chat from './Chat'
import Group from './group'
import Message from './Message'
import { addNotification } from 'notify'

// Change default to HelioHost's invite.
const defaultInvite = 'https://discord.gg/fAk2rMfyba'

export default connect()
  .with(({ state, signals, props }) => {
    const channel = state.channel.get()
    return {
      server: state.server,
      loading: state.loading,
      activeChannel: state.activeChannel,
      channel,
      messages: channel && channel.messages ? channel.messages.values() : null
    }
  })
  .toClass(
    props =>
      class Messages extends React.PureComponent<typeof props> {
        getContent = () => {
          const { loading } = this.props
          const { channel, messages } = this.props

          if (loading) {
            return <Loading />
          }

          if (messages) {
            const grouped = Group(messages)

            return grouped.length ? (
              <ScrollVisible ref={this.scroll.bind(this)} className="messages">
                {grouped.map(group => <Message messages={group} key={group[0].id} lastSeen={channel.lastSeenID} all={messages} />)}
              </ScrollVisible>
            ) : (
              <NoMessages className="no-messages" />
            )
          }

          return null
        }

        render() {
          const { server, channel } = this.props

          const header = channel && (
            <Header>
              <Stretch>
                <Name>{channel.name}</Name>
                {channel.topic && <Topic>{channel.topic}</Topic>}
              </Stretch>
              <Join href={defaultInvite} target="_blank" onClick={this.join.bind(this)}>
                <FormattedMessage id="header.join" />
              </Join>
            </Header>
          )
          const content = this.getContent()

          return content ? (
            <Wrapper>
              {header}
              {content}
              {channel && channel.permissions && channel.permissions.includes('SendMessages') && <Chat />}
            </Wrapper>
          ) : (
            <ErrorAhoy />
          )
        }

        async join(event: Event) {
          const { activeChannel, server } = this.props
          const { window, document } = self.open()

          event.preventDefault()

          document.body.style.backgroundColor = '#36393F'
          document.title = `Join "${server.name}"`

          // Attempt to get an invite for the specified channel
          // if it fails, fallback to one on a random channel
          try {
            const invite = await fetchInvite(activeChannel)
            document.location.href = invite
          } catch (e) {
            window.close()
            addNotification({
              level: 'error',
              title: 'Unable to Join',
              message: 'WidgetBot does not have permissions to invite you to this server...',
              autoDismiss: 5000
            })
          }
        }

        /**
         * Captures scroll positions from channels, so when
         * you switch channels, your position is retained
         */
        positions = new Map() as Map<string, number>
        position = -1
        scrollable

        componentWillReceiveProps(nextProps: typeof props) {
          const { activeChannel } = this.props
          const nextChannel = nextProps.activeChannel

          if (!activeChannel || !this.scrollable) return

          if (nextChannel !== activeChannel) {
            // Record scroll position of the current channel
            this.positions.set(activeChannel, this.scrollable.getScrollTop())

            // Extract the last scroll position of the next channel
            if (this.positions.has(nextChannel)) {
              this.position = this.positions.get(nextChannel)
            } else {
              this.position = -1
            }
          }
        }

        scroll(ref) {
          if (!ref) return
          this.scrollable = ref

          if (this.scrollable) {
            if (this.position === -1) {
              this.scrollable.scrollToBottom()
            } else {
              this.scrollable.scrollTop(this.position)
            }
          }
        }
      }
  )
