const jackal = require('./jackal')
const provider = require('./provider')

jackal.start(() =>
  console.log("\n\nJackal started on port 25863")
)

provider.start(() =>
  console.log("\n\nProvider started on port 5000")
)
