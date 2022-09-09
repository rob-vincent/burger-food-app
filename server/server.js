import express from "express"
import { config } from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import colors from "colors"

config()
// connectDB()

const app = express()

app.use(express.json())

app.use("/api/users", userRoutes)

if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
