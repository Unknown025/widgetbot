import 'database/guest'

import config from 'config'
import { SetEnhancer } from 'database/guest-message'
import * as Pending from 'database/guest-message/pending'
import { PermissionsBitField, Webhook } from 'discord.js'
import * as Discord from 'discord.js'
import Permissions from 'engine/permissions'
import fetchChannel from 'engine/util/fetchChannel'
import logger from 'logger'
import raven from 'raven'

import sanitize from './sanitize'
import { Login } from 'database/guest'

interface IGuest {
  server: string
  token: string
}

class Guest {
  public token: string
  public server: string

  public name: string
  public avatar: string
  public id: string
  public type = 'guest'

  public messages = [] as Discord.Message[]

  constructor({ server, token }: IGuest) {
    this.server = server
    this.token = token
  }

  /**
   * Hydrates the Guest instance with data from the database
   */
  async login(data: { ip: string }) {
    const guest = await Login({ ...data, token: this.token })

    this.name = guest.user.name
    this.avatar = guest.user.avatar
    this.id = guest.user.id
  }

  cacheMessage(message: Discord.Message) {
    if (message instanceof Array) {
      const error = new Error(`Message shouldn't be an array`)
      raven.captureException(error)
      throw error
    }

    SetEnhancer(
      {
        user: {
          name: this.name,
          avatar: this.avatar || message.author.avatarURL(),
          id: this.id
        },
        id: message.id
      },
      message.content
    )

    return this.messages.push(message)
  }

  async sendMessage(channelID: string, unsanitized: string) {
    const req = {
      server: this.server,
      channel: channelID
    }

    const { channel, permissions } = await fetchChannel(req)
    const guestPermissions = await Permissions(req)

    // Disallow guests without permission from sending messages
    if (!guestPermissions.has(PermissionsBitField.Flags.SendMessages)) {
      throw `You don't have permission to send messages on this channel`
    }

    // Sanitize the message - @everyone, @here etc.
    const message = sanitize(unsanitized)

    if (!permissions.has('ManageWebhooks')) {
      logger.error(`Missing permission to manage webhooks in #${channel.name}, send message as self`)
      return await this.sendMessageAsSelf(channel, message)
    }

    const webhooks = await channel.fetchWebhooks()
    // let [webhook] = webhooks.filterArray(({ name }) => name === config.discord.webhook)
    let webhook: Webhook

    for (const hook of webhooks.values()) {
      if (hook.name === config.discord.webhook) {
        webhook = hook
        break
      }
    }
    // let [webhook] = webhooks[config.discord.webhook]

    if (webhook) {
      return await this.sendMessageAsWebhook(channel, webhook, message)
    } else {
      logger.error(`Could not find own webhook, create new one`)
    }

    try {
      const newWebhook = await channel.createWebhook({ name: config.discord.webhook, reason: 'Allows WidgetBot users to write messages to this channel' })
      return await this.sendMessageAsWebhook(channel, newWebhook, message)
    } catch (error) {
      logger.log('error', error.toString())
      return await this.sendMessageAsSelf(channel, message)
    }
  }

  // Webhook sending failed, will try sending as self
  async sendMessageAsSelf(channel: Discord.TextChannel, message: string) {
    const content = `\`${this.name}\` ${message}`

    // The client.on('message') event is called
    // before our .then callback. Hack to detect this
    Pending.instantate(content)
    const newMessage = (await channel.send(content)) as Discord.Message
    this.cacheMessage(newMessage)
    return newMessage
  }

  async sendMessageAsWebhook(channel: Discord.TextChannel, webhook: Discord.Webhook, message: string) {
    // The client.on('message') event is called
    // before our .then callback. Hack to detect this
    Pending.instantate(message)

    try {
      const newMessage = (await webhook.send({
        content: message,
        username: this.name,
        avatarURL: this.avatar
      })) as Discord.Message

      this.cacheMessage(newMessage)

      return newMessage
    } catch (error) {
      logger.log('error', error.toString())
      return await this.sendMessageAsSelf(channel, message)
    }
  }

  private typingTimeout

  async startTyping(channelID: string) {
    try {
      const { channel } = await fetchChannel({ server: this.server, channel: channelID }, 'SendMessages')

      channel.sendTyping()
    } catch (e) {
      // Bad perms
    }
  }

  async stopTyping(channelID: string) {
    try {
      const { channel } = await fetchChannel({ server: this.server, channel: channelID }, 'SendMessages')

      // Clear typing timeout
      clearTimeout(this.typingTimeout)
    } catch (e) {
      // Bad perms
    }
  }
}

export default Guest
