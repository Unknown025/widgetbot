# [WidgetBot](https://widgetbot.io) ![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg) [![](https://data.jsdelivr.com/v1/package/npm/@widgetbot/crate/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@widgetbot/crate) [![](https://data.jsdelivr.com/v1/package/npm/@widgetbot/html-embed/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@widgetbot/html-embed)

## Note: Requires Node.js 18 or newer

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

WidgetBot is a pixel-perfect open-source Discord chat widget for your website. It is distributed and developed under the [GNU General Public License v3 (GPL-3) Open Source License](<https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)>).

[![Banner](./.github/banner.png)](https://widgetbot.io)

## Development

The official Widgetbot team uses [Visual Studio Code](https://code.visualstudio.com) for developing Widgetbot.

This fork uses the [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/) which is the paid version.
The free one, Community Edition, doesn't support web development.
You also have to install the [NodeJS](https://plugins.jetbrains.com/plugin/6098-nodejs) plugin.

You can use either, or something else.

## Building Embed & Server

**Before** you are able to build anything make sure you have `yarn` installed:

```bash
npm install -g yarn
```

If you're a **macOS or Linux** user, or if you're on **Windows with the Git shell** installed, you can build all packages at once like this:

```bash
yarn build
```

If you want to build them manually or use **Windows without Git shell**:

```bash
yarn
yarn workspace @widgetbot/embed-api build
yarn workspace @widgetbot/react-embed build
yarn workspace @widgetbot/html-embed build  # you can skip this one if you don't need it
yarn workspace embed build
yarn workspace @widgetbot/crate build
yarn workspace server build
```

Then run the server:

```bash
yarn workspace server start
```

- You can find the embed running at http://localhost:7000/channels/YOUR-SERVER-ID.
- Invite your Bot to your Discord server using http://localhost:7000/api/invite.

## Packages

| @widgetbot/                                                    | Description                         |                                                      |                                                  |
| -------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| [embed](https://widgetbot.io)                                  | ReactJS widget client               | [Docs](https://docs.widgetbot.io/embed/)             | [/packages/embed/](/packages/embed/)             |
| [crate](http://npmjs.com/package/@widgetbot/crate)             | JS library that provides popup chat | [Docs](https://docs.widgetbot.io/embed/crate/)       | [/packages/crate/](/packages/crate/)             |
| [react-embed](http://npmjs.com/package/@widgetbot/react-embed) | React component for the embed       | [Docs](https://docs.widgetbot.io/embed/react-embed/) | [/packages/react-embed/](/packages/react-embed/) |
| [html-embed](http://npmjs.com/package/@widgetbot/html-embed)   | HTML element for the embed          | [Docs](https://docs.widgetbot.io/embed/html-embed/)  | [/packages/html-embed/](/packages/html-embed/)   |
| [embed-api](http://npmjs.com/package/@widgetbot/embed-api)     | Embed GraphQL JS API                | [Docs](https://docs.widgetbot.io/embed/embed-api/)   | [/packages/embed-api/](/packages/embed-api/)     |

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/13242392?v=4" width="100px;"/><br /><sub><b>Sam Denty</b></sub>](https://samdd.me)<br />[🐛](https://github.com/widgetbot-io/widgetbot/widgetbot-io/WidgetBot/issues?q=author%3Asamdenty99 "Bug reports") [💻](https://github.com/widgetbot-io/widgetbot/widgetbot-io/WidgetBot/commits?author=samdenty99 "Code") [🎨](#design-samdenty99 "Design") [📖](https://github.com/widgetbot-io/widgetbot/widgetbot-io/WidgetBot/commits?author=samdenty99 "Documentation") [💡](#example-samdenty99 "Examples") [🚇](#infra-samdenty99 "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-samdenty99 "Reviewed Pull Requests") [🔧](#tool-samdenty99 "Tools") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
