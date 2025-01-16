import { sequence, sequenceWithProps } from 'fluent'

import { Reaction } from '../../types/message'
import Modal from '../../types/modal'
import { message } from '../../types/socket'
import { User } from '../../types/user'
import * as actions from '../actions'
import { Toggles } from '../types'

export const routeHome = () => {
  if (process.env.NODE_ENV === 'development') {
    const ping = new Image()
    ping.src = 'http://localhost:8000'
    ping.onload = () => (location.href = 'http://localhost:8000')
    ping.onerror = () => (location.href = '/channels/186188135095336960/')
  } else {
    location.href = '/'
  }
}

/**
 * Router
 */
export const fetchServer = sequenceWithProps<{
  server: string
}>(s =>
  s
    .action(actions.routed)
    .action(actions.switchScreen('choose-channel'))
    .branch(actions.select)
    .paths({
      cached: s => s,
      uncached: s =>
        s
          .action(actions.loading(true))
          .branch(actions.GraphQL.fetchServer)
          .paths({
            success: s => s.action(actions.GraphQL.store),
            error: s => s.action(actions.notify)
          })
          .action(actions.loading(false))
    })
)

export const fetchChannel = sequenceWithProps<{
  server: string
  channel: string
}>(s =>
  s
    .action(actions.routed)
    .action(actions.switchScreen('active-channel'))
    .branch(actions.select)
    .paths({
      cached: s => s,
      uncached: s =>
        s
          .action(actions.loading(true))
          .branch(actions.GraphQL.fetchServer)
          .paths({
            success: s => s.action(actions.GraphQL.store),
            error: s => s.action(actions.notify)
          })
          .action(actions.loading(false))
    })
)

export const switchChannel = sequenceWithProps<{
  channel: string
}>(s =>
  s
    .action(actions.closeDrawerOnMobile)
    .action(actions.switchScreen('active-channel'))
    .branch(actions.select)
    .paths({
      cached: s => s,
      uncached: s =>
        s
          .action(actions.loading(true))
          .branch(actions.GraphQL.fetchChannel)
          .paths({
            success: s => s.action(actions.GraphQL.updateChannel),
            error: s => s.action(actions.notify)
          })
          .action(actions.loading(false))
    })
)

/**
 * Message sequences
 */
export const insertMessage = sequenceWithProps<message>(s => s.action(actions.setMessage))

export const updateMessage = sequenceWithProps<message>(s => s.action(actions.setMessage))

export const deleteMessage = sequenceWithProps<{ channel: string; id: string }>(s => s.action(actions.deleteMessage))

export const deleteMessageBulk = sequenceWithProps<{
  channel: string
  ids: string[]
}>(s => s.action(actions.deleteMessageBulk))

export const sendMessage = sequenceWithProps<{
  channel: string
  message: string
}>(s =>
  s.branch(actions.signUp).paths({
    complete: s =>
      s.branch(actions.sendMessage).paths({
        sending: s => s.action(actions.setMessage)
      }),
    interrupted: s => s
  })
)

/**
 * Socket.io sequences
 */
export const subscribe = sequenceWithProps<{ channel: string }>(s => s.action(actions.subscribe))

export const unsubscribe = sequenceWithProps<{ channel: string }>(s => s.action(actions.unsubscribe))

/**
 * Reaction sequences
 */
export const messageReactionAdd = sequenceWithProps<{
  channel: string
  id: string
  reaction: Reaction
}>(s => s.action(actions.messageReactionAdd))

export const messageReactionRemove = sequenceWithProps<{
  channel: string
  id: string
  reaction: Reaction
}>(s => s.action(actions.messageReactionRemove))

/**
 * Interactive sequences
 */
export const toggle = sequenceWithProps<{ component: Toggles }>(s => s.action(actions.toggle))

export const modal = sequenceWithProps<{
  open: boolean
  type?: Modal['type']
  data?: Modal['data']
}>(s => s.action(actions.modal))

export const typing = sequenceWithProps<{ typing: boolean; channel: string }>(s => s.action(actions.typing))

/**
 * Authentication sequences
 */
export const signUp = sequenceWithProps<{ name: string }>(s => s.action(actions.createAccount))

export const signIn = sequenceWithProps<User>(s => s.action(actions.signIn))

export const singleSignOn = sequence(s => s.action(actions.singleSignOn))
