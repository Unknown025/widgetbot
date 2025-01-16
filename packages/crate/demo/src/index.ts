import Crate from '../../src'

const crate = new Crate({
  server: '186188135095336960', // Changed for debugging
  channel: '419674373746720778', // Changed for debugging
  shard: 'http://localhost:3000',
  // glyph: ['https://samdd.me/favicon.ico', '50%'],
  css: `
  &:not(.open) .button {
    background: blue;
    &:hover {
      background: red;
    }
  }
`
  // defer: true
})

crate.on('signIn', user => {
  console.log(user)
  // crate.emit('sendMessage', 'Testing')
})
