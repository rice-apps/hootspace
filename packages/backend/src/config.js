import 'dotenv/config'
import log from 'loglevel'
import sanitizeHtml from 'sanitize-html'

if (process.env.NODE_ENV === 'development') {
  log.setLevel('trace')
}

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',')
const DEV_PORT = parseInt(process.env.DEV_PORT, 10)
const { MONGODB_CONNECTION_URL } = process.env

const { CAS_VALIDATE_URL } = process.env
const { CLIENT_TOKEN_SECRET } = process.env
const { SERVICE_URL } = process.env
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME, 10)

const COLLEGES = process.env.COLLEGES.split(';')
const MAJORS = process.env.MAJORS.split(';')
const MINORS = process.env.MINORS.split(';')

const MAX_REPORTS = parseInt(process.env.MAX_REPORTS, 10)

const { AWS_ACCESS_KEY_ID } = process.env
const { AWS_SECRET_ACCESS_KEY } = process.env
const { BUCKET } = process.env
const { REGION } = process.env
const { REDISHOST } = process.env
const REDISPORT = parseInt(process.env.REDISPORT, 10)

const CHECK_HTML_CONFIG = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: {
    a: ['href'],
    img: ['src']
  }
}

const MONGOOSE_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const REDIS_OPTIONS = {
  host: REDISHOST,
  port: REDISPORT,
  retryStrategy: times => Math.min(times * 50, 2000)
}

export {
  ALLOWED_ORIGINS,
  DEV_PORT,
  MONGODB_CONNECTION_URL,
  CAS_VALIDATE_URL,
  CLIENT_TOKEN_SECRET,
  SERVICE_URL,
  TOKEN_EXPIRE_TIME,
  COLLEGES,
  MAJORS,
  MINORS,
  MAX_REPORTS,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  BUCKET,
  REGION,
  CHECK_HTML_CONFIG,
  MONGOOSE_CONFIG,
  REDIS_OPTIONS
}
