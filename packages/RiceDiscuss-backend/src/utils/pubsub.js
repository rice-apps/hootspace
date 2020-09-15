import { GooglePubSub } from '@axelspringer/graphql-google-pubsub'

const pubsub = new GooglePubSub({
    projectId: 'ricediscuss'
})

export default pubsub
