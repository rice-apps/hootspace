import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Divider from '@material-ui/core/Divider'

import AddToCalendar from 'react-add-to-calendar'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import ReactHtmlParser from 'react-html-parser'
import remarkable from '../utils/remarkable'

import TimeAgo from 'react-timeago'
import Truncate from 'react-truncate'

import { FETCH_COMMENTS_NESTED } from '../graphql/Queries'
import CommentChunk from './CommentChunk'

import {
  DiscussionBoxSection,
  OriginalPosterDiv,
  OriginalPosterPic,
  OriginalPosterName,
  TimeAgoDiv,
  DiscussionBox,
  TopComponent,
  DividerTop,
  LeftComponent,
  Likes,
  Upvote,
  Downvote,
  TopMiddleComponent,
  DiscussionTitle,
  KindDiv,
  Kind,
  Tags,
  Tag,
  ViewTags,
  MoreOptions,
  DDMenu,
  DiscussionBody,
  Save,
  AddTo,
  Report,
  Delete,
  FullPostLink,
  Expand,
  ReadMore,
  ImageDiv,
  DescriptorDiv,
  CommentComponent,
  DividerBottom,
  ShowCommentsDiv,
  CommentInput,
  CommentButton,
  CommentButtonText,
  CommentsDiv,
  BoldedSpan,
  NormalSpan,
  Pic
} from './PostChunk.styles'
import { tagColors } from './tagColors'
import HeadshotUrl from '../images/headshot.svg'
import { cache } from '../utils/apollo'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

function PostChunk (props) {
  // Comments stuff starts
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(FETCH_COMMENTS_NESTED, {
    variables: {
      post_id: props.post.node._id
    },
    fetchPolicy: 'network-only'
  })

  // Comments stuff ends

  const classes = useStyles()
  let oneImage = <></>

  if (props.post.node.imageUrl) {
    oneImage = (
      <img width={500} src={props.post.node.imageUrl} alt='Custom-thing' />
    )
  }

  const myPostID = props.post.node._id
  const myPostLink = '/posts/' + String(myPostID) // forming the url

  const listOfUpvoters = props.post.node.upvotes.map(
    userObject => userObject.username
  )

  const listOfDownvoters = props.post.node.downvotes.map(
    userObject => userObject.username
  )

  const [comment, setComment] = useState('')

  const [isDDOpen, setDDOpen] = useState(false)
  const [isTagsOpen, setTagsOpen] = useState(false)
  const [isUpvoted, setUpvoted] = useState(
    listOfUpvoters.includes(props.userInfo.username)
  )
  const [isDownvoted, setDownvoted] = useState(
    listOfDownvoters.includes(props.userInfo.username)
  )
  const [isCommentOpen] = useState(false)
  const [, setReplyID] = useState(null)

  const toggleDD = () => {
    setDDOpen(!isDDOpen)
  }

  const toggleTags = () => {
    setTagsOpen(!isTagsOpen)
  }

  const toggleUpvoted = () => {
    setUpvoted(!isUpvoted)
    setDownvoted(false)
  }

  const toggleDownvoted = () => {
    setDownvoted(!isDownvoted)
    setUpvoted(false)
  }

  if (loading) {
    // return <p>Loading Comments</p>
    return <div />
  }

  if (error) {
    return <p>Error Fetching Comments</p>
  }

  const theComments = data.commentByPost // array

  let numComments = theComments.length

  theComments.forEach(comment => {
    numComments += comment.children.length
    if (comment.children) {
      comment.children.forEach(child => {
        numComments += child.children.length
      })
    }
  })

  const calIcon = { 'calendar-plus-o': 'right' }

  const calDropDown = [
    { google: 'Google Calendar' },
    { apple: 'Apple Calendar' }
  ]

  const calEvent = {
    title: props.post.node.title ? props.post.node.title : '',
    description: props.post.node.body ? props.post.node.body : '',
    location: props.post.node.location ? props.post.node.location : '',
    workplace: props.post.node.workplace ? props.post.node.workplace : '',
    startTime: props.post.node.start ? props.post.node.start : '',
    endTime: props.post.node.end ? props.post.node.end : '',
    deadline: props.post.node.deadline ? props.post.node.deadline : ''
  }

  const isPaid = props.post.node.isPaid
  let paidString = ''
  if (typeof isPaid === 'boolean') {
    paidString = isPaid === true ? 'Yes' : 'No'
  }
  const isClosed = props.post.node.isClosed
  let closedString = ''
  if (typeof isClosed === 'boolean') {
    closedString = isClosed === true ? 'Yes' : 'No'
  }

  const jobSpecifics = {
    isPaid: paidString,
    isClosed: closedString
  }

  // maybe we should put N/A if it wasn't specified hmm...
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const postDescriptor = []
  if (calEvent.startTime.length > 0) {
    const startDate = calEvent.startTime.split('T')[0]
    const formattedDate = startDate.split('-')
    const month = months[parseInt(formattedDate[1], 10) - 1]
    postDescriptor.push(
      <NormalSpan key={1}>
        <BoldedSpan>From: </BoldedSpan>
        {month + ' ' + formattedDate[2] + ', ' + formattedDate[0] + '      '}
      </NormalSpan>
    )
  }
  if (calEvent.endTime.length > 0 || calEvent.deadline.length > 0) {
    const until =
      calEvent.endTime.length > 0 ? calEvent.endTime : calEvent.deadline
    const endDate = until.split('T')[0]
    const formattedDate = endDate.split('-')
    const month = months[parseInt(formattedDate[1], 10) - 1]
    postDescriptor.push(
      <NormalSpan key={2}>
        <BoldedSpan>End: </BoldedSpan>
        {month + ' ' + formattedDate[2] + ', ' + formattedDate[0] + '      '}
      </NormalSpan>
    )
  }
  if (calEvent.location.length > 0 || calEvent.workplace.length > 0) {
    const place =
      calEvent.location.length > 0 ? calEvent.location : calEvent.workplace
    postDescriptor.push(
      <NormalSpan key={3}>
        <BoldedSpan>Location: </BoldedSpan>
        {place}
      </NormalSpan>
    )
  }
  if (jobSpecifics.isPaid.length > 0) {
    postDescriptor.push(
      <NormalSpan key={4}>
        <BoldedSpan>Paid: </BoldedSpan>
        {jobSpecifics.isPaid}
      </NormalSpan>
    )
  }
  if (jobSpecifics.isClosed.length > 0) {
    postDescriptor.push(
      <NormalSpan key={5}>
        <BoldedSpan>Closed: </BoldedSpan>
        {jobSpecifics.isClosed}
      </NormalSpan>
    )
  }

  const checkComment = comment => comment.length <= 0

  return (
    <>
      <DiscussionBoxSection>
        <DiscussionBox>
          <LeftComponent>
            <Upvote className={classes.root}>
              <IconButton
                style={
                  isUpvoted
                    ? { color: '#7380FF', width: '3vw' }
                    : { color: grey[700], width: '3vw' }
                }
                onClick={e => {
                  e.preventDefault()
                  toggleUpvoted()
                  props.upvotePost({
                    variables: {
                      _id: props.post.node._id
                    }
                  })
                }}
              >
                <ArrowDropUp fontSize='default' />
              </IconButton>
            </Upvote>
            <Likes>
              {props.post.node.upvotes.length -
                props.post.node.downvotes.length}
            </Likes>
            <Downvote className={classes.root}>
              <IconButton
                style={
                  isDownvoted
                    ? { color: '#7380FF', width: '3vw' }
                    : { color: grey[800], width: '3vw' }
                }
                onClick={e => {
                  e.preventDefault()
                  toggleDownvoted()
                  props.downvotePost({
                    variables: {
                      _id: props.post.node._id
                    }
                  })
                }}
              >
                <ArrowDropDown fontSize='default' />
              </IconButton>
            </Downvote>
          </LeftComponent>
          <TopComponent>
            <OriginalPosterDiv>
              {/* <a> */}
              <OriginalPosterPic>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Pic src={props.post.node.creator.imageUrl || HeadshotUrl} />
                </div>
              </OriginalPosterPic>
              <OriginalPosterName>
                <div>
                  <t style={{ alignSelf: 'center' }}>
                    {props.post.node.creator.username}
                  </t>
                </div>
              </OriginalPosterName>
              <TimeAgoDiv>
                <TimeAgo
                  date={props.post.node.date_created}
                  style={{
                    alignSelf: 'center',
                    justifySelf: 'right',
                    textAlign: 'right'
                  }}
                />
              </TimeAgoDiv>
              {/* </a> */}
            </OriginalPosterDiv>

            <Tags>
              {props.post.node.tags.length > 0 && (
                <Tag style={tagColors[0 % tagColors.length]}>
                  {props.post.node.tags[0]}
                </Tag>
              )}
              {props.post.node.tags.length > 1 && (
                <Tag style={tagColors[1 % tagColors.length]}>
                  {props.post.node.tags[1]}
                </Tag>
              )}
              {props.post.node.tags.length > 2 && (
                <Tag style={tagColors[2 % tagColors.length]}>
                  {props.post.node.tags[2]}
                </Tag>
              )}

              {isTagsOpen &&
                props.post.node.tags.slice(3).map((tag, index) => (
                  <Tag key={tag} style={tagColors[index % tagColors.length]}>
                    {tag}
                  </Tag>
                ))}

              {props.post.node.tags.length > 3 && (
                <ViewTags onClick={toggleTags}>
                  {isTagsOpen ? (
                    <text style={{ cursor: 'pointer', outline: 'none' }}>
                      (View Less)
                    </text>
                  ) : (
                    <text
                      style={{
                        cursor: 'pointer',
                        outline: '0 none',
                        border: 'none'
                      }}
                    >
                      (View All Tags)
                    </text>
                  )}
                </ViewTags>
              )}
            </Tags>
            <DividerTop>
              <Divider
                style={{ width: '51.5vw', maxWidth: '92%', marginTop: '1vh' }}
              />
            </DividerTop>
          </TopComponent>
          <TopMiddleComponent>
            <DiscussionTitle>
              <Truncate
                lines={1}
                ellipsis={
                  <span>
                    ...
                    <FullPostLink to={myPostLink}>
                      <ReadMore>Read More</ReadMore>
                    </FullPostLink>
                  </span>
                }
              >
                {props.post.node.title}
              </Truncate>
            </DiscussionTitle>

            <KindDiv>
              <Kind>{props.post.node.kind}</Kind>
            </KindDiv>

            <MoreOptions className={classes.root}>
              <IconButton
                onClick={toggleDD}
                style={{ height: '7vh', width: '7vh' }}
              >
                <MoreHorizIcon
                  open={isDDOpen}
                  style={{ height: '4vh', width: '4vh' }}
                />
              </IconButton>
              {isDDOpen && (
                <DDMenu>
                  <Expand onClick={() => navigate(myPostLink)}>
                    <FullPostLink>Full Post</FullPostLink>
                  </Expand>

                  <Save
                    onClick={e => {
                      e.preventDefault()

                      const currentSavedPosts = props.userInfo.savedPosts.map(
                        tup => tup._id
                      )

                      props
                        .savePost({
                          variables: {
                            savedPosts: [
                              ...currentSavedPosts,
                              props.post.node._id
                            ]
                          }
                        })
                        .then(truthyIfSuccessful => {
                          if (truthyIfSuccessful) {
                            setDDOpen(false)
                            alert(
                              'Post has been saved! You can view saved posts on your profile.'
                            )
                          }
                        })
                    }}
                  >
                    Save Post
                  </Save>
                  {(props.post.node.kind === 'Event' ||
                    props.post.node.kind === 'Job') && (
                    <AddTo>
                      <AddToCalendar
                        event={calEvent}
                        buttonLabel='Add to '
                        buttonTemplate={calIcon}
                        listItems={calDropDown}
                      />
                    </AddTo>
                  )}

                  <Report
                    onClick={e => {
                      e.preventDefault()

                      props
                        .reportPost({
                          variables: {
                            _id: props.post.node._id
                          }
                        })
                        .then(truthyIfSuccessful => {
                          if (truthyIfSuccessful) {
                            setDDOpen(false)
                            alert(
                              'Post has been reported. A riceapps member will review the post to determine if it ' +
                                "fails to meet hootspace's community guidelines."
                            )
                          }
                        })
                    }}
                  >
                    Report Post
                  </Report>

                  {props.post.node.creator.username ===
                    props.userInfo.username && (
                    <Delete
                      onClick={e => {
                        e.preventDefault()
                        props.removePost({
                          variables: {
                            _id: props.post.node._id
                          }
                        })
                        cache.evict({ id: props.post.node._id })
                        cache.gc()
                        window.location.reload(false)
                      }}
                    >
                      Delete Post
                    </Delete>
                  )}
                </DDMenu>
              )}
            </MoreOptions>
            <DiscussionBody style={{ textAlign: props.post.node.text_align }}>
              {ReactHtmlParser(remarkable.render(props.post.node.body))}
            </DiscussionBody>
            <ImageDiv>{oneImage}</ImageDiv>
            <DescriptorDiv>{postDescriptor}</DescriptorDiv>
          </TopMiddleComponent>

          <CommentComponent>
            <DividerBottom>
              <Divider
                style={{ width: '51.5vw', maxWidth: '92%', marginTop: '1vh' }}
              />
            </DividerBottom>

            <ShowCommentsDiv>
              <Button
                startIcon={<CommentOutlinedIcon fontSize='large' />}
                style={{
                  background: 'none',
                  border: 'none',
                  font: 'Avenir',
                  fontSize: '1.75vh',
                  textTransform: 'none',
                  display: 'flex'
                }}
                // onClick={toggleComment}
                onClick={() => {
                  navigate(myPostLink)
                }}
              >
                {isCommentOpen ? (
                  <text style={{ color: '#67687E' }}>
                    Hide Comments ({numComments})
                  </text>
                ) : (
                  <text style={{ color: '#67687E' }}>
                    Show Comments ({numComments})
                  </text>
                )}
              </Button>
            </ShowCommentsDiv>

            {isCommentOpen && (
              <CommentInput
                id='comment'
                placeholder='Comment here...'
                onChange={e => setComment(e.target.value)}
              />
            )}
            {isCommentOpen && (
              <CommentButton
                onClick={e => {
                  e.preventDefault()
                  if (checkComment(comment)) return
                  try {
                    props.createComment({
                      variables: {
                        creator: props.userInfo.netID,
                        post: props.post.node._id,
                        parent: null,
                        body: comment
                      }
                    })
                    setComment('')
                    console.log(document.getElementById('comment').value)
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                <CommentButtonText>Post Comment</CommentButtonText>
              </CommentButton>
            )}
            {isCommentOpen && (
              <CommentsDiv>
                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                  {/* level 1 */}
                  {theComments.map(comment => (
                    <li key={comment._id} style={{ listStyleType: 'none' }}>
                      <CommentChunk
                        comment={comment}
                        postID={props.post.node._id}
                        setParentID={setReplyID}
                        isLeaf={false}
                      />
                      {/* <button onClick={() => setReplyID(comment._id)}>Reply</button> */}
                      <ul style={{ listStyleType: 'none' }}>
                        {/* level 2 */}
                        {comment.children.map(child1 => (
                          <li
                            key={child1._id}
                            style={{ listStyleType: 'none' }}
                          >
                            <CommentChunk
                              comment={child1}
                              postID={props.post.node._id}
                              isLeaf={false}
                            />
                            <ul style={{ listStyleType: 'none' }}>
                              {/* level 3 */}
                              {child1.children.map(child2 => (
                                <li
                                  key={child2._id}
                                  style={{ listStyleType: 'none' }}
                                >
                                  <CommentChunk
                                    comment={child2}
                                    postID={props.post.node._id}
                                    isLeaf
                                  />
                                  {/* dont nest any further */}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </CommentsDiv>
            )}
          </CommentComponent>
        </DiscussionBox>
      </DiscussionBoxSection>
    </>
  )
}

export default PostChunk
