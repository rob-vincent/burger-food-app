import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
)

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email })
  if (!user) throw new Error("Invalid credentials")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid credentials")

  return user
}

userSchema.pre("save", function (next) {
  const user = this

  if (user.isModified("password")) user.password = bcrypt.hash(user.password, 8)

  next()
})

const User = mongoose.model("User", userSchema)

export default User
