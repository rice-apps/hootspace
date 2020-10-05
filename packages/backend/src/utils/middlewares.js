import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import sanitizeHtml from 'sanitize-html'

import { Post, Comment, User } from '../models'
import { CHECK_HTML_CONFIG } from '../config'

function checkLoggedIn (resolve, source, args, context, info) {
  if (context.netID) {
    return resolve(source, args, context, info)
  }

  return new AuthenticationError('Not logged in!')
}

function userCheckCreate (resolve, source, args, context, info) {
  if (context.netID === args.record.creator) {
    return resolve(source, args, context, info)
  }

  return new ForbiddenError('User cannot create content as different user!')
}

async function userCheckComment (resolve, source, args, context, info) {
  const comment = await Comment.findById(args._id)

  if (comment.creator === context.netID) {
    return resolve(source, args, context, info)
  }

  return new ForbiddenError('User does not have edit access to this comment')
}

async function userCheckPost (resolve, source, args, context, info) {
  const post = await Post.findById(args.record._id)

  if (post.creator === context.netID) {
    return resolve(source, args, context, info)
  }

  return new ForbiddenError('User does not have access to edit this post')
}

async function userCheckUserFilter (resolve, source, args, context, info) {
  if (args.filter.netID === context.netID) {
    return resolve(source, args, context, info)
  }

  return new AuthenticationError('User is not the same')
}

async function userCheckUserId (resolve, source, args, context, info) {
  const user = await User.findById(args.record._id)

  if (user.netID === context.netID) {
    return resolve(source, args, context, info)
  }

  return new AuthenticationError('User is not the same')
}

async function checkHTML (resolve, source, args, context, info) {
  const newArgs = { ...args }

  if (newArgs.record.body) {
    newArgs.record.body = sanitizeHtml(args.record.body, CHECK_HTML_CONFIG)
  }

  return resolve(source, newArgs, context, info)
}

const removeTokenFromFindOne = next => rp =>
  next({ ...rp, projection: { netID: {}, ...rp.projection } })
    .then(payload => {
      if (
        typeof payload.netID === 'undefined' ||
        payload.netID !== rp.context.netID
      ) {
        payload.token = null
      }

      return payload
    })
    .catch(err => {
      log.error(err)
      return new ApolloError(`User findOne failed: ${err}`)
    })

const removeTokenFromFindMany = next => rp =>
  next({ ...rp, projection: { netID: {}, ...rp.projection } })
    .then(payload => {
      if (
        typeof payload[0] !== 'undefined' &&
        (typeof payload[0].netID === 'undefined' ||
          payload[0].netID !== rp.context.netID)
      ) {
        payload[0].token = null
      }

      return payload
    })
    .catch(err => {
      log.error(err)
      return new ApolloError(`User findOne failed: ${err}`)
    })

const removeTokenFromConnection = next => rp =>
  next({ ...rp, projection: { netID: {}, ...rp.projection } })
    .then(payload => {
      for (let i = 0; i < payload.edges.length; i += 1) {
        if (
          typeof payload.edges[i].node.netID === 'undefined' ||
          payload.edges[i].node.netID !== rp.context.netID
        ) {
          payload.edges[i].node.token = null
        }
      }

      return payload
    })
    .catch(err => {
      log.error(err)
      return new ApolloError(`User connection resolver failed: ${err}`)
    })

export {
  checkLoggedIn,
  checkHTML,
  userCheckCreate,
  userCheckComment,
  userCheckPost,
  userCheckUserFilter,
  userCheckUserId,
  removeTokenFromFindOne,
  removeTokenFromFindMany,
  removeTokenFromConnection
}
