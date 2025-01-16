import WidgetBot from '../../src'

const html = String.raw

document.querySelector('#demo').innerHTML = html`
  <widgetbot
    server="186188135095336960"
    channel="419674373746720778"
    shard="http://localhost:3000"
    id="embed"
    height="600"
    width="500"
  >
  </widgetbot>

  <widgetbot style="resize: both"
    server="186188135095336960"
    shard="http://localhost:3000"
  >
  </widgetbot>
`

new WidgetBot()

const embed: any = document.getElementById('embed')

embed.on('signIn', data => {
  console.log(data.name)

  embed.emit('sendMessage', `Hello world! my name is ${data.name}`)
})
