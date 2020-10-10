import {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} from 'apollo-server-express'
import sanitizeHtml from 'sanitize-html'

import { Post, Comment, User } from '../models'
import { CHECK_HTML_CONFIG } from '../config'

/**
 * Checks if the user is logged in (if netID is present in the context) and throws and error otherwise
 *
 * @param {(source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any} resolve the next resolver in the chain
 * @param {TSource} source the previous object or field from which the call originated
 * @param {TArgs} args the arguments to the resolver
 * @param {TContext} context the global context (contains stuff like auth)
 * @param {import('graphql').GraphQLResolveInfo} info holds field-specific information relevant to the current query as well as the schema details
 *
 * @return {any | AuthenticationError} returns the result of the next resolver in the sequence or an auth error
 */
function checkLoggedIn (resolve, source, args, context, info) {
  if (context.netID) {
    return resolve(source, args, context, info)
  }

  return new AuthenticationError('Not logged in!')
}

/**
 * Prevents a user from creating content as a different user
 *
 * @param {(source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any} resolve the next resolver in the chain
 * @param {TSource} source the previous object or field from which the call originated
 * @param {TArgs} args the arguments to the resolver
 * @param {TContext} context the global context (contains stuff like auth)
 * @param {import('graphql').GraphQLResolveInfo} info holds field-specific information relevant to the current query as well as the schema details
 *
 * @return {any | ForbiddenError} returns the result of the next resolver in the sequence or an forbidden error
 */
function userCheckCreate (resolve, source, args, context, info) {
  if (context.netID === args.record.creator) {
    return resolve(source, args, context, info)
  }

  return new ForbiddenError('User cannot create content as different user!')
}

/**
 * Prevents user from editing a comment they didn't create
 *
 * @param {(source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any} resolve the next resolver in the chain
 * @param {TSource} source the previous object or field from which the call originated
 * @param {TArgs} args the arguments to the resolver
 * @param {TContext} context the global context (contains stuff like auth)
 * @param {import('graphql').GraphQLResolveInfo} info holds field-specific information relevant to the current query as well as the schema details
 *
 * @return {any | ForbiddenError} returns the result of the next resolver in the sequence or an forbidden error
 */
async function userCheckComment (resolve, source, args, context, info) {
  const comment = await Comment.findById(args._id)

  if (comment.creator === context.netID) {
    return resolve(source, args, context, info)
  }

  return new ForbiddenError('User does not have edit access to this comment')
}

/**
 * Prevents a user from editing a post they didn't create
 *
 * @param {(source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any} resolve the next resolver in the chain
 * @param {TSource} source the previous object or field from which the call originated
 * @param {TArgs} args the arguments to the resolver
 * @param {TContext} context the global context (contains stuff like auth)
 * @param {import('graphql').GraphQLResolveInfo} info holds field-specific information relevant to the current query as well as the schema details
 *
 * @return {any | ForbiddenError} returns the result of the next resolver in the sequence or an forbidden error
 */
async function userCheckPost (resolve, source, args, context, info) {
  const post = await Post.findById(args.record._id)

  if (post.creator === context.netID) {
    return resolve(source, args, context, info)
  }

  return new ForbiddenError('User does not have access to edit this post')
}

/**
 * Prevents searching for a user that is not the current logged in user
 *
 * @param {(source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any} resolve the next resolver in the chain
 * @param {TSource} source the previous object or field from which the call originated
 * @param {TArgs} args the arguments to the resolver
 * @param {TContext} context the global context (contains stuff like auth)
 * @param {import('graphql').GraphQLResolveInfo} info holds field-specific information relevant to the current query as well as the schema details
 *
 * @return {any | AuthenticationError} returns the result of the next resolver in the sequence or an auth error
 */
async function userCheckUserFilter (resolve, source, args, context, info) {
  if (args.filter.netID === context.netID) {
    return resolve(source, args, context, info)
  }

  return new AuthenticationError('User is not the same')
}

/**
 * Prevents accessing profile information for a user that's not the current user
 *
 * @param {(source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any} resolve the next resolver in the chain
 * @param {TSource} source the previous object or field from which the call originated
 * @param {TArgs} args the arguments to the resolver
 * @param {TContext} context the global context (contains stuff like auth)
 * @param {import('graphql').GraphQLResolveInfo} info holds field-specific information relevant to the current query as well as the schema details
 *
 * @return {any | AuthenticationError} returns the result of the next resolver in the sequence or an auth error
 */
async function userCheckUserId (resolve, source, args, context, info) {
  const user = await User.findById(args.record._id)

  if (user.netID === context.netID) {
    return resolve(source, args, context, info)
  }

  return new AuthenticationError('User is not the same')
}
/**
 * Sanitizes the body of HTML posts
 *
 * @param {(source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo) => any} resolve the next resolver in the chain
 * @param {TSource} source the previous object or field from which the call originated
 * @param {TArgs} args the arguments to the resolver
 * @param {TContext} context the global context (contains stuff like auth)
 * @param {import('graphql').GraphQLResolveInfo} info holds field-specific information relevant to the current query as well as the schema details
 *
 * @return {any} returns the result of the next resolver in the sequence
 */
async function checkHTML (resolve, source, args, context, info) {
  const newArgs = { ...args }

  if (newArgs.record.body) {
    newArgs.record.body = sanitizeHtml(args.record.body, CHECK_HTML_CONFIG)
  }

  return resolve(source, newArgs, context, info)
}

/**
 * Removes the token from a User.findOne resolver
 *
 * @param {(rp: { source: TSource; args: TArgs; context: TContext; info: GraphQLResolveInfo; projection: Partial<import('graphql-compose').ProjectionType>; [opt: string]: any;}) => Promise<any> | any | ApolloError} next
 *
 * @returns {Promise<any> | any | ApolloError} the result of the next wrapper in the chain
 */
const removeTokenFromFindOne = next =>
  /**
   * @param {{ source: TSource; args: TArgs; context: TContext; info: GraphQLResolveInfo; projection: Partial<import('graphql-compose').ProjectionType>; [opt: string]: any;}} rp
   * @returns {Promise<any> | any | ApolloError}
   */
  rp =>
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

/**
 * Removes the token from a User.findMany resolver
 *
 * @param {(rp: { source: TSource; args: TArgs; context: TContext; info: GraphQLResolveInfo; projection: Partial<import('graphql-compose').ProjectionType>; [opt: string]: any;}) => Promise<any> | any | ApolloError} next
 *
 * @returns {Promise<any> | any | ApolloError} the result of the next wrapper in the chain
 */
const removeTokenFromFindMany = next =>
  /**
   * @param {{ source: TSource; args: TArgs; context: TContext; info: GraphQLResolveInfo; projection: Partial<import('graphql-compose').ProjectionType>; [opt: string]: any;}} rp
   * @returns {Promise<any> | any | ApolloError}
   */
  rp =>
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

/**
 * Removes the token from a User.connection resolver
 *
 * @param {(rp: { source: TSource; args: TArgs; context: TContext; info: GraphQLResolveInfo; projection: Partial<import('graphql-compose').ProjectionType>; [opt: string]: any;}) => Promise<any> | any | ApolloError} next
 * @returns {Promise<any> | any | ApolloError} the result of the next wrapper in the chain
 */
const removeTokenFromConnection = next =>
  /**
   * @param {{ source: TSource; args: TArgs; context: TContext; info: GraphQLResolveInfo; projection: Partial<import('graphql-compose').ProjectionType>; [opt: string]: any;}} rp
   * @returns {Promise<any> | any | ApolloError}
   */
  rp =>
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
