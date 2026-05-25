import config from 'config'
import { ClientOptions, GatewayIntentBits, Options } from 'discord.js'

const options: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.MessageContent
  ],
  makeCache: Options.cacheWithLimits({ MessageManager: config.cache['graphql.messageHistory'] }) /*,
  messageSweepInterval: 10*/
}

export default options
