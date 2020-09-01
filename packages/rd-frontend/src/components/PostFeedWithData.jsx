import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'

import { Helmet } from 'react-helmet'
import PostFeed from './PostFeed'
import { POST_PAGE, GET_FILTERED_IDS } from '../graphql/Queries'
import { POST_CREATED, POST_VOTE_CHANGED } from '../graphql/Subscriptions'
import WritePost from './WritePost'

import {
  Background,
  PostFeedContainer,
  RightSidebarContainer,
  LeftSidebarContainer,
  NewPostButtonContainer
} from './PostFeedWithData.styles'

import { SideNav } from './SideNav'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'

function PostFeedWithData () {
  const [today, setToday] = useState(null)
  const [earlyDateBound, setEarlyDateBound] = useState(new Date(2000, 1, 1))

  // these set states are there so we can remember our filters upon filter.jsx remount
  const [upvoteFilter, setUpvoteFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [tagFilter, setTagFilter] = useState([])

  // when we clear filter, this gets set to empty string and it will cause
  // a graphql bug within our GET_FILTER_ID query because "" is not a valid EnumPostKey
  const [kindFilter, setKindFilter] = useState('Discussion')

  const [postIDs, setPostIDs] = useState([])
  const [filterType, setFilterType] = useState('')
  const [firstTime, setFirstTime] = useState(true)

  const { subscribeToMore, fetchMore, refetch, ...result } = useQuery(
    POST_PAGE,
    {
      variables: {
        after: '',
        listOfIDs: postIDs
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first'
    }
  )

  // change filterStyle to activate the backend
  const { refetch: refetchFilter, data: filteredData } = useQuery(
    GET_FILTERED_IDS,
    {
      variables: {
        filterStyle: filterType,
        tags: tagFilter,
        beginDate: earlyDateBound,
        endDate: today,
        upvoteType: upvoteFilter,
        kind: kindFilter
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first'
    }
  )

  // by default we set latest day to be today
  useEffect(() => {
    setToday(new Date())
  }, [])

  // get the post_ids
  useEffect(() => {
    console.log('filter type: ', filterType)
    console.log('kind of post: ', kindFilter)
    // just in case
    if (kindFilter === '') setKindFilter('Discussion')
    refetchFilter()
  }, [filterType])

  // whenever the post_Ids change, we set the post_id state
  useEffect(() => {
    if (filteredData) {
      const IDs = filteredData.getFilteredData.map(post => post._id)
      setPostIDs(IDs)
      console.log('IDs that were retrieved', IDs)
    } else {
      setPostIDs(filteredData)
    }
  }, [filteredData])

  // get the actual data from the post_Id
  useEffect(() => {
    console.log('Refetched for post data')
    refetch()
  }, [postIDs])

  // --- start
  // 1) POST_PAGE will use empty post_ids array --> empty discussion feed
  // 2) FILTER query will also fire and without any restrictions, get all the post_ids
  // 3) set post_id state --> cause useEffect to fire.  useEffect will contain the refetch
  // 4) POST_PAGE will query the backend with all the post_ids and return the default look

  // 5) Apply a filter --> refetch the FILTER query --> refetch the POST_PAGE
  // 6) Clear all filters --> refetch FILTER --> refetch POST_PAGE
  // ---

  const [modalVisible, setVisibility] = useState(false)
  const openModal = () => setVisibility(true)

  return (
    <>
      <Helmet>
        <title>RiceDiscuss &middot; Your Feed</title>
      </Helmet>
      <Background>
        <LeftSidebarContainer>
          <SideNav />
        </LeftSidebarContainer>
        <PostFeedContainer>
          <NewPostButtonContainer>
            <Button
              variant='contained'
              onClick={openModal}
              style={{
                textTransform: 'none',
                background: '#ffffff93 0% 0% no-repeat padding-box',
                borderRadius: '0.7vw',
                marginLeft: '-4.5vw',
                marginTop: '3vw'
              }}
              startIcon={
                <AddCircleIcon
                  style={{ color: '#7380FF', width: '1.3vw', height: '1.3vw' }}
                />
              }
            >
              Create Post
            </Button>
            {/* <NewPostButton onClick={openModal}>
              <AddCircleIcon
                style={{ color: '#7380FF', width: '1.3vw', height: '1.3vw' }}
              />
              <ButtonText>Create Post</ButtonText>
            </NewPostButton> */}
          </NewPostButtonContainer>

          {/* <BannerContainer>
            <Banner />
          </BannerContainer> */}
          <PostFeed
            {...result}
            setEarlyDateBound={setEarlyDateBound}
            currentDate={today}
            setDateFilter={setDateFilter}
            setUpvoteFilter={setUpvoteFilter}
            setKindFilter={setKindFilter}
            setTagFilter={setTagFilter}
            dateFilter={dateFilter}
            upvoteFilter={upvoteFilter}
            kindFilter={kindFilter}
            tagFilter={tagFilter}
            setTypeofFilter={setFilterType}
            refetch={refetchFilter}
            firstTime={firstTime}
            setFirstTime={setFirstTime}
            post_ids={postIDs}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  after: result.data.postConnection.pageInfo.endCursor
                }
              })
            }
            subscribeToNewPosts={() =>
              subscribeToMore({
                document: POST_CREATED,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData) {
                    return prev
                  }

                  return {
                    ...prev,
                    postConnection: {
                      count: prev.postConnection.count + 1,
                      edges: [
                        {
                          cursor: window.btoa(
                            JSON.stringify({
                              _id: subscriptionData.data.postCreated._id
                            })
                          ),
                          node: subscriptionData.data.postCreated
                        },
                        ...prev.postConnection.edges
                      ],
                      pageInfo: prev.postConnection.pageInfo,
                      __typename: 'PostConnection'
                    }
                  }
                }
              })
            }
            subscribeToNewVotes={() =>
              subscribeToMore({
                document: POST_VOTE_CHANGED
              })
            }
          />
        </PostFeedContainer>
        <RightSidebarContainer />
      </Background>
      <WritePost
        show={modalVisible}
        switchVisibility={setVisibility}
        style={{ position: 'fixed' }}
      />
    </>
  )
}
export default PostFeedWithData
