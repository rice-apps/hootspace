import mongoose from 'mongoose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';

import composeDataloader from '../utils/dataloader';

const resolverList = ['findById', 'findByIds', 'findOne', 'findMany',
    'count', 'createOne', 'createMany', 'updateById', 'updateOne',
    'updateMany', 'removeById', 'removeOne', 'removeMany'];

// Create discriminator key
const DKey = 'kind';

// Create types of posts possible
const enumPostType = {
    Discussion: 'Discussion',
    Event: 'Event',
    Notice: 'Notice',
    Job: 'Job'
};

// Define base Post schema
const PostSchema = new mongoose.Schema({
    kind: {
        type: String,
        require: true,
        enum: Object.keys(enumPostType),
        description: 'The type of the post (whether event, discussion, or notice)'
    },

    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    date_created: {
        type: Date,
        required: false,
        default: (new Date()).getTime(),
    },

    tags: {
        type: [String],
        required: false,
        default: []
    },

    creator: {
        type: String,
        required: true,
    }
});

// Schema definitions for enum types
const DiscussionSchema = new mongoose.Schema();

const NoticeSchema = new mongoose.Schema({
    deadline: {
        type: Date,
        required: true
    }
});

const EventSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    place: {
        type: String,
        required: false
    }
});

const JobSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    place: {
        type: String,
        required: true
    },

    isPaid: {
        type: Boolean,
        required: true
    },

    isClosed: {
        type: Boolean,
        required: true
    }
});

// Set discriminator key and create the base model
PostSchema.set('discriminatorKey', DKey);

const Post = mongoose.model('Post', PostSchema);

// Set the discriminator for other subtypes
const Discussion = Post.discriminator(enumPostType.Discussion, DiscussionSchema);
const Notice = Post.discriminator(enumPostType.Notice, NoticeSchema);
const Event = Post.discriminator(enumPostType.Event, EventSchema);
const Job = Post.discriminator(enumPostType.Job, JobSchema);

// TODO: add base options (https://graphql-compose.github.io/docs/plugins/plugin-mongoose.html#working-with-mongoose-collection-level-discriminators)
// for Discriminator models and possible for base model

const PostDTC = composeWithMongooseDiscriminators(Post);

const DiscussionTC = PostDTC.discriminator(Discussion, {});
const NoticeTC = PostDTC.discriminator(Notice, {});
const EventTC = PostDTC.discriminator(Event, {});
const JobTC = PostDTC.discriminator(Job, {});

PostDTC.addResolver({
    name: 'findManyByCreator',

    args: {
        creator: `String`,
    },

    type: [PostDTC],

    resolve: async ({ source, args, context, info }) => {
        return Post.find({creator: args.creator});
    },
});

const PostDTCDL = composeDataloader(PostDTC, [...resolverList, ...['findManyByCreator']], {
    cacheExpiration: 3000,
    removeProjection: true,
    debug: false,
});

const DiscussionTCDL = composeDataloader(DiscussionTC, resolverList, {
    cacheExpiration: 3000,
    removeProjection: true,
    debug: false,
});

const NoticeTCDL = composeDataloader(NoticeTC, resolverList, {
    cacheExpiration: 3000,
    removeProjection: true,
    debug: false,
});

const EventTCDL = composeDataloader(EventTC, resolverList, {
    cacheExpiration: 3000,
    removeProjection: true,
    debug: false,
});

const JobTCDL = composeDataloader(JobTC, resolverList, {
    cacheExpiration: 3000,
    removeProjection: true,
    debug: false,
});

export {
    Post,
    Discussion,
    Notice,
    Event,
    Job,
    PostDTCDL as PostDTC,
    DiscussionTCDL as DiscussionTC,
    NoticeTCDL as NoticeTC,
    EventTCDL as EventTC,
    JobTCDL as JobTC,
};
