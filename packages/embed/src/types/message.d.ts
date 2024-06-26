import MessageType from './messagetype'

export interface Attachment {
  url: string | null
  height: number | null
  width: number | null
}

export interface MessageReference {
  channelId: string
  guildId: string | undefined
  messageId: string | undefined
}

interface Message {
  id: string
  reference: MessageReference | null
  author: Author
  timestamp: number
  content: string | null
  embeds: Embed[]
  editedAt: Date
  type: MessageType
  reactions: Reaction[]
  attachment: Attachment
  mentions: {
    channels: {
      name: string
      id: string
    }[]
    members: {
      name: string
      id: string
      roles: Role[] | null
      avatar: string
    }[]
    roles: {
      name: string
      color: string
      id: string
    }[]
    everyone: boolean
  }
}

export type AuthorTypes = 'guest' | 'member' | 'sysadmin' | 'bot'

export interface Author {
  name: string
  avatar: string
  type: AuthorTypes
  id: string
  color: string
  roles: Role[]
}

export interface Role {
  color: string
  position: number
  name: string
}

export interface Embed {
  color: number
  fields: [EmbedField]
  footer: EmbedFooter
  thumbnail: EmbedThumbnail
  author: Author
  image: EmbedImage
  provider: EmbedProvider
  video: EmbedVideo
  title: string
  description: string
  url: string
  timestamp: number
}

export interface EmbedField {
  value: string
  name: string
  inline: Boolean
}

export interface EmbedFooter {
  iconURL: string
  proxyIconUrl: string
  text: string
}

export interface EmbedThumbnail {
  height: number
  width: number
  proxyURL: string
  url: string
}

export interface EmbedImage {
  height: number
  width: number
  proxyURL: string
  url: string
}

export interface EmbedProvider {
  name: string
  url: string
}

export interface EmbedVideo {
  height: number
  width: number
  url: string
}

export interface Reaction {
  name: string
  id: string
  count: number
}

export default Message
export type messages = Message[]
