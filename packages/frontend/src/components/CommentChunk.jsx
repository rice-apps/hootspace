import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { currentUser } from '../utils/apollo'

import {
  CREATE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  REPORT_COMMENT,
  REMOVE_COMMENT
} from '../graphql/Mutations'

import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import TimeAgo from 'react-timeago'
import log from 'loglevel'

import {
  CommentWhole,
  CommentDiv,
  CommentAuthorDiv,
  CommentMenu,
  ReplyStart,
  ReportButton,
  TimestampDiv,
  CountDiv,
  CommentVotes,
  CommentUpvote,
  CommentDownvote,
  ReplyArea,
  ReplyInput,
  PostReplyButton,
  ReplyButtonText,
  DeleteButton
} from './CommentChunk.styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

function CommentChunk (props) {
  const userInfo = currentUser()
  const [createComment] = useMutation(CREATE_COMMENT)
  const [upvoteComment] = useMutation(UPVOTE_COMMENT)
  const [downvoteComment] = useMutation(DOWNVOTE_COMMENT)
  const [reportComment] = useMutation(REPORT_COMMENT)
  const [removeComment] = useMutation(REMOVE_COMMENT)
  const classes = useStyles()

  const [reply, setReply] = useState('')

  const [replyAreaVisible, setVisibility] = useState(false)
  const switchModal = () => setVisibility(!replyAreaVisible)

  const listOfUpvoters = props.comment.upvotes.map(
    userObject => userObject.username
  )

  const listOfDownvoters = props.comment.downvotes.map(
    userObject => userObject.username
  )

  const [isUpvoted, setUpvoted] = useState(
    listOfUpvoters.includes(userInfo.username)
  )
  const [isDownvoted, setDownvoted] = useState(
    listOfDownvoters.includes(userInfo.username)
  )
  const [isReplyOpen, setReplyOpen] = useState(false)

  const toggleUpvoted = () => {
    setUpvoted(!isUpvoted)
    setDownvoted(false)
  }

  const toggleDownvoted = () => {
    setDownvoted(!isDownvoted)
    setUpvoted(false)
  }

  const toggleReply = () => {
    setReplyOpen(!isReplyOpen)
  }

  const checkComment = comment => comment.length <= 0

  return (
    <CommentWhole>
      <CommentVotes>
        <CommentUpvote className={classes.root}>
          <IconButton
            style={isUpvoted ? { color: '#7380FF' } : { color: grey[700] }}
            onClick={e => {
              e.preventDefault()
              toggleUpvoted()
              upvoteComment({
                variables: {
                  _id: props.comment._id
                }
              })
            }}
          >
            <ArrowDropUp fontSize='normal' />
          </IconButton>
        </CommentUpvote>
        <CommentDownvote className={classes.root}>
          <IconButton
            style={isDownvoted ? { color: '#7380FF' } : { color: grey[800] }}
            onClick={e => {
              e.preventDefault()
              toggleDownvoted()
              downvoteComment({
                variables: {
                  _id: props.comment._id
                }
              })
            }}
          >
            <ArrowDropDown fontSize='normal' />
          </IconButton>
        </CommentDownvote>
      </CommentVotes>
      <CommentDiv>
        <CommentAuthorDiv><strong>{props.comment.creator.username}:</strong></CommentAuthorDiv>
        {' ' + props.comment.body}
      </CommentDiv>

      <CommentMenu>
        {/* TODO deleting comments */}
        {/* TODO ************************************************** */}

        {/* only want this reply button to show up on non leaf comments */}
        {/* might need to adapt design/css based on this functionality */}
        {!props.isLeaf && (
          <ReplyStart
            onClick={e => {
              e.preventDefault()
              toggleReply()
              switchModal()
            }}
          >
            {isReplyOpen ? <text>Cancel</text> : <text>Reply</text>}
          </ReplyStart>
        )}

        <CountDiv style={{ fontSize: '1.8vh' }}>
          {props.comment.upvotes.length - props.comment.downvotes.length}
          {props.comment.upvotes.length - props.comment.downvotes.length ===
          1 ? (
            <text> hoot</text>
          ) : (
            <text> hoots</text>
          )}
        </CountDiv>

        <ReportButton
          onClick={e => {
            e.preventDefault()

            // TODO doesn't work yet (bad request errors)
            reportComment({
              variables: {
                _id: props.comment._id
              }
            })
          }}
        >
          Report
        </ReportButton>

        {/* TODO delete top level comment -> delete its replies */}
        {/* sometimesssss the refresh still doesnt delete */}

        {props.comment.creator.username === userInfo.username && (
          <DeleteButton
            onClick={e => {
              e.preventDefault()
              removeComment({
                variables: {
                  _id: props.comment._id
                }
              })
              window.location.reload(false)
            }}
          >
            Delete
          </DeleteButton>
        )}

        <TimestampDiv>
          <TimeAgo
            date={props.comment.date_created}
            style={{ fontSize: '1.8vh' }}
          />
        </TimestampDiv>
      </CommentMenu>

      {!props.isLeaf && replyAreaVisible && (
        <ReplyArea>
          <ReplyInput
            id={String(props.comment._id)}
            placeholder='Reply here...'
            onChange={e => setReply(e.target.value)}
          />

          <PostReplyButton
            onClick={e => {
              e.preventDefault()
              if (checkComment(reply)) return
              try {
                createComment({
                  variables: {
                    post: props.postID,
                    parent: props.comment._id,
                    body: reply
                  }
                })
                setReply('')
                document.getElementById(String(props.comment._id)).value = ''
              } catch (error) {
                log.error(error)
              }
            }}
          >
            <ReplyButtonText>Post Reply</ReplyButtonText>
          </PostReplyButton>
        </ReplyArea>
      )}
    </CommentWhole>
  )
}

export default CommentChunk
