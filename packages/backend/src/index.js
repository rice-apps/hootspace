import express from 'express'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import http from 'http'
import jwt from 'jsonwebtoken'
import log from 'loglevel'
import cors from 'cors'
import S3 from 'aws-sdk/clients/s3'

import Schema from './schema'

import './utils/db'

import {
  CLIENT_TOKEN_SECRET,
  DEV_PORT,
  REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from './config'

const s3 = new S3({
  apiVersion: '2006-03-01',
  region: REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
})

const app = express().use(cors())

const server = new ApolloServer({
  schema: Schema,
  logger: log,
  tracing: process.env.NODE_ENV === 'development',
  context: ({ req }) => {
    if (req) {
      try {
        const decoded = jwt.verify(
          req.headers.authorization,
          CLIENT_TOKEN_SECRET
        )

        return {
          netID: decoded.netID,
          s3: s3
        }
      } catch (err) {
        return {
          netID: null
        }
      }
    }

    return {
      netID: null
    }
  },
  subscriptions: {
    onConnect: (connectionParams, websocket, context) => {
      if (connectionParams.authToken) {
        try {
          const decoded = jwt.verify(
            connectionParams.authToken,
            CLIENT_TOKEN_SECRET
          )

          log.info(
            `WebSocket connected from ${context.request.headers.origin} using ${websocket.protocol}`
          )

          return {
            netID: decoded.netID
          }
        } catch (err) {
          websocket.close()
          return new AuthenticationError(
            `WebSocket authentication failed due to ${err}`
          )
        }
      }

      return {
        netID: null
      }
    },

    onDisconnect: (websocket, context) => {
      log.info(
        `WebSocket disconnected from ${context.request.headers.origin} using ${websocket.protocol}`
      )
    }
  }
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: DEV_PORT }, () => {
  log.info(
    `🚀 Server ready at http://localhost:${DEV_PORT}${server.graphqlPath}`
  )
  log.info(
    `🚀 Subscriptions ready at ws://localhost:${DEV_PORT}${server.subscriptionsPath}`
  )
})
