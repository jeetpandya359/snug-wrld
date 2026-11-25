import { compare, hash } from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return
  this.password = await hash(this.password, 12)
})

userSchema.methods.matchPassword = function matchPassword(enteredPassword) {
  return compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
