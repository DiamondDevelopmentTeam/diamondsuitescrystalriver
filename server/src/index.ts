import { createApp } from './app.js'
import { config } from './config.js'

const app = createApp()

app.listen(config.PORT, () => {
  console.info(`Diamond Suites Crystal River server listening on port ${config.PORT}`)
})
