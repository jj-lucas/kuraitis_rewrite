require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    },
  },
  (deets) => {
    console.log(`Server is now running on port
    http:/localost:${deets.port}`)
  }
)
