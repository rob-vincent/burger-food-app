import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`Mongodb Connected-${conn.connection.host}`.bgCyan.white)
  } catch (error) {
    console.log(`Proxy error-${error.message}`.bgRed.white)
    process.exit(1)
  }
}

export default connectDB
