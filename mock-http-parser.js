if (typeof process.binding === 'function') {
  try {
    const httpParserJs = require('http-parser-js')
    const originalBinding = process.binding
    process.binding = function(name) {
      if (name === 'http_parser') {
        return {
          HTTPParser: httpParserJs.HTTPParser,
          methods: httpParserJs.HTTPParser.methods
        }
      }
      return originalBinding.call(process, name)
    }
  } catch (e) {
    // If http-parser-js is not installed yet or cannot be required, ignore.
  }
}
