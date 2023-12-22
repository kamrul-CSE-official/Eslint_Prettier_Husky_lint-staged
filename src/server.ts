import mongoose from 'mongoose'
import app from './app'
import config from './config/config'

async function boostrap() {
  try {
    await mongoose.connect(config.dbUrl as string)
    console.log('Database connection successfull 🎁')

    app.listen(config.port, () => {
      console.log(`This server is listening port: ${config.port} 🏃`)
    })
  } catch (error) {
    console.log('Database Connection Fail: ', error)
  }
}

boostrap()
