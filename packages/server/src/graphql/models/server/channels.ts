import config from 'config'
import { ChannelType, PermissionsBitField, TextChannel } from 'discord.js'
import { client } from 'engine'
import Permissions from 'engine/permissions'
import memoize from 'memoizee'
import timestring from 'timestring'

import { Channel } from '../../../types/message'

async function Channels(server: string) {
  const guild = client.guilds.cache.get(server)

  return await Promise.all(
    guild.channels.cache
      // Only allow text & news channels we have permission to view.
      .filter(
        channel =>
          (channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildAnnouncement) &&
          channel.permissionsFor(client.user).has(PermissionsBitField.Flags.ViewChannel, true)
      )

      // Order channels by position
      .sort((a, b) => {
        const chanA = a as TextChannel
        const chanB = b as TextChannel

        const catA = chanA.parent ? chanA.parent.position : -1
        const catB = chanB.parent ? chanB.parent.position : -1

        if (catA !== catB) {
          return catA - catB
        }

        const parentIdA = chanA.parent ? chanA.parent.id : ''
        const parentIdB = chanB.parent ? chanB.parent.id : ''
        if (parentIdA !== parentIdB) {
          return parentIdA.localeCompare(parentIdB)
        }

        return chanA.position - chanB.position
      })

      // Inject extra details into the channels
      .map(
        async (channel: TextChannel): Promise<Channel> => {
          const { parent, name, topic, type, id } = channel

          const permissions = await Permissions({ server, channel: id })
          const category = parent ? parent.name : null

          return { name, topic, type, id, category, permissions }
        }
      )
  )

  // // Filter the channels by whether they have the READ_MESSAGES permission
  // return channels.filter(({ permissions }) => {
  // 	if (!permissions)
  // 		return false
  // 	if (!permissions.VIEW_CHANNEL)
  // 		return false
  // 	return permissions.READ_MESSAGE_HISTORY
  // })
}

export default memoize(Channels, {
  promise: true,
  maxAge: timestring(config.cache['graphql.channelsExpiration'], 'ms')
})
