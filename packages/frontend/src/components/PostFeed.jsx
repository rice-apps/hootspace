import InfiniteScroll from 'react-infinite-scroller'
import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'

import PostChunk from './PostChunk'
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
  REPORT_POST,
  REMOVE_POST,
  SAVE_POST,
  CREATE_COMMENT
} from '../graphql/Mutations'
import { currentUser } from '../utils/apollo'
// import log from 'loglevel'

function PostFeed (props) {
  const date = new Date()
  const userInfo = currentUser()
  const [upvotePost] = useMutation(UPVOTE_POST)
  const [downvotePost] = useMutation(DOWNVOTE_POST)
  const [reportPost] = useMutation(REPORT_POST)
  const [removePost] = useMutation(REMOVE_POST)
  const [savePost] = useMutation(SAVE_POST)
  const [createComment] = useMutation(CREATE_COMMENT)

  const {
    onLoadMore,
    subscribeToNewPosts,
    subscribeToNewVotes,
    loading,
    error,
    data
  } = props

  useEffect(() => {
    const unsubscribePosts = subscribeToNewPosts()
    const unsubscribeVotes = subscribeToNewVotes()

    return () => {
      unsubscribePosts()
      unsubscribeVotes()
    }
  }, [])

  if (error) return <h1>Loading...</h1>
  // if (error) return <>;
  if (loading || !data) return <h1>Loading...</h1>

  const {
    postConnection: {
      edges,
      pageInfo: { hasNextPage }
    }
  } = data

  // log.info('POSTS', data)

  const generatePosts = edges => {
    return edges.map((post, _i) => {
      return (
        <PostChunk
          userInfo={userInfo}
          upvotePost={upvotePost}
          downvotePost={downvotePost}
          reportPost={reportPost}
          removePost={removePost}
          savePost={savePost}
          createComment={createComment}
          post={post}
          key={post.node._id}
        />
      )
    })
  }

  const posts = generatePosts(edges)

  const formattedPosts = (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => onLoadMore()}
        hasMore={hasNextPage}
        loader={<div key={date.getTime()}>Loading...</div>}
      >
        {posts}
      </InfiniteScroll>
    </>
  )

  if (formattedPosts.length === 0) {
    return <h1>No posts oops... imma add a go-back to clear things</h1>
  }

  return formattedPosts
}

export default PostFeed
