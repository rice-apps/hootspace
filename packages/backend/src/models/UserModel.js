import { composeMongoose } from 'graphql-compose-mongoose'
import { Schema, model } from 'mongoose'
import { COLLEGES, MAJORS, MINORS } from '../config'

const validator = require('validator').default

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  netID: {
    type: String,
    required: true,
    unique: true
  },

  token: {
    type: String,
    required: false,
    unique: true
  },

  date_joined: {
    type: Date,
    required: false,
    default: Date.now,
    index: true
  },

  college: {
    type: String,
    enum: COLLEGES,
    required: false
  },

  major: {
    type: [String],
    validate: {
      validator: majors => majors.every(major => MAJORS.includes(major)),
      message: props => `${props.value} has a major that's not valid!`
    },
    required: false
  },

  minor: {
    type: [String],
    validate: {
      validator: minors => minors.every(minor => MINORS.includes(minor)),
      message: props => `${props.value} has a minor that's not valid!`
    },
    required: false
  },

  isNewUser: {
    type: Boolean,
    default: true
  },

  savedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PostInterface'
    }
  ],

  email: {
    type: String,
    required: false,
    validate: {
      validator: email => (email ? validator.isEmail(email) : true),
      message: props => `${props.value} is not a valid email`
    }
  },

  phone: {
    type: String,
    required: false,
    validate: {
      validator: phone => (phone ? validator.isMobilePhone(phone) : true),
      message: props => `${props.value} is not a valid phone number`
    }
  },

  imageUrl: {
    type: String,
    required: false,
    validate: {
      validator: url => (url ? validator.isURL(url) : true),
      message: props => `${props.value} is not a valid URL`
    }
  }
})

const User = model('User', UserSchema)

const UserTC = composeMongoose(User)

export { User, UserTC }
