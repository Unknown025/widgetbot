import * as Discord from 'discord.js'

import * as Message from '../../../types/message'

class Embed implements Message.Embed {
  title?: string
  description?: string
  url?: string
  timestamp?: number
  color?: number
  type?: string
  fields?: { name: string; value: string; inline: boolean }[]
  footer?: { text?: string; iconURL?: string; proxyIconUrl?: string }
  thumbnail?: { url?: string; proxyURL?: string; height?: number; width?: number }
  image?: { url?: string; proxyURL?: string; height?: number; width?: number }
  author?: { name?: string; url?: string; iconURL?: string; proxyIconURL?: string }
  provider?: { name?: string; url?: string }
  video?: { url?: string; height?: number; width?: number }

  constructor(embed: Discord.Embed) {
    if (!embed || !embed.data) return

    this.title = embed.data.title ?? undefined
    this.description = embed.data.description ?? undefined
    this.url = embed.data.url ?? undefined
    this.timestamp = embed.data.timestamp ? new Date(embed.data.timestamp).getTime() : undefined
    this.color = embed.data.color ?? undefined
    this.type = embed.data.type ?? undefined

    if (embed.data.fields) {
      this.fields = embed.data.fields.map(f => ({
        name: f.name,
        value: f.value,
        inline: !!f.inline
      }))
    }

    if (embed.data.footer) {
      this.footer = {
        text: embed.data.footer.text ?? undefined,
        iconURL: embed.data.footer.icon_url ?? undefined,
        proxyIconUrl: embed.data.footer.proxy_icon_url ?? undefined
      }
    }

    if (embed.data.thumbnail) {
      this.thumbnail = {
        url: embed.data.thumbnail.url ?? undefined,
        proxyURL: embed.data.thumbnail.proxy_url ?? undefined,
        height: embed.data.thumbnail.height ?? undefined,
        width: embed.data.thumbnail.width ?? undefined
      }
    }

    if (embed.data.image) {
      this.image = {
        url: embed.data.image.url ?? undefined,
        proxyURL: embed.data.image.proxy_url ?? undefined,
        height: embed.data.image.height ?? undefined,
        width: embed.data.image.width ?? undefined
      }
    }

    if (embed.data.author) {
      this.author = {
        name: embed.data.author.name ?? undefined,
        url: embed.data.author.url ?? undefined,
        iconURL: embed.data.author.icon_url ?? undefined,
        proxyIconURL: embed.data.author.proxy_icon_url ?? undefined
      }
    }

    if (embed.data.provider) {
      this.provider = {
        name: embed.data.provider.name ?? undefined,
        url: embed.data.provider.url ?? undefined
      }
    }

    if (embed.data.video) {
      this.video = {
        url: embed.data.video.url ?? undefined,
        height: embed.data.video.height ?? undefined,
        width: embed.data.video.width ?? undefined
      }
    }
  }
}

export default Embed
