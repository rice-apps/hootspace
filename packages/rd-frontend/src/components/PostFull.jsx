import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { GET_POST } from "../graphql/Queries";

import { currentUser } from '../utils/apollo'
import {
    UPVOTE_POST,
    DOWNVOTE_POST,
    REPORT_POST,
    REMOVE_POST,
    SAVE_POST
} from '../graphql/Mutations'
import { FETCH_COMMENTS_POST } from '../graphql/Queries'

import { makeStyles } from '@material-ui/core/styles'
import { red, grey } from '@material-ui/core/colors'

import AddToCalendar from 'react-add-to-calendar'

import IconButton from '@material-ui/core/IconButton'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import ShareIcon from '@material-ui/icons/Share'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import ReactHtmlParser from 'react-html-parser'

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'

import {
    DiscussionBoxSection,
    OP,
    Time,
    DiscussionBox,
    LeftComponent,
    Likes,
    Upvote,
    Downvote,
    TopMiddleComponent,
    DiscussionTitleDiv,
    DiscussionTitle,
    Tags,
    Tag,
    ViewTags,
    MoreOptions,
    DDMenu,
    DiscussionBody,
    BottomComponent,
    Save,
    AddTo,
    Report,
    Delete,
    ShareFacebook,
    ShareTwitter,
    Share,
    BackToFeed,
} from './PostFull.styles'

JavascriptTimeAgo.addLocale(en)

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}))

function PostFull() {
    // *********** post feed setup below

    const userInfo = currentUser()
    const [upvotePost] = useMutation(UPVOTE_POST)
    const [downvotePost] = useMutation(DOWNVOTE_POST)
    const [reportPost] = useMutation(REPORT_POST)
    const [removePost] = useMutation(REMOVE_POST)
    const [savePost] = useMutation(SAVE_POST)
    const [getCommentsPost, { refetch, ...result }] = useLazyQuery(
        FETCH_COMMENTS_POST
    )

    // *********** post full setup below

    let { postID } = useParams();

    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            id: postID,
        },
    });

    const dummyData = {
        imageUrl: "",
        upvotes: [],
        downvotes: []
    };
    let thePost = dummyData; //for now

    // *********** post chunk setup below

    const classes = useStyles()
    let oneImage = <></>

    // *********** post chunk setup below

    if (thePost.imageUrl) {
        oneImage = (
            <img width={500} src={thePost.imageUrl} alt='Custom-thing' />
        )
    }

    let listOfUpvoters = thePost.upvotes.map(
        userObject => userObject.username
    )

    let listOfDownvoters = thePost.downvotes.map(
        userObject => userObject.username
    )

    const [isDDOpen, setDDOpen] = useState(false)
    const [isTagsOpen, setTagsOpen] = useState(false)
    const [isUpvoted, setUpvoted] = useState(
        listOfUpvoters.includes(userInfo.username)
    )
    const [isDownvoted, setDownvoted] = useState(
        listOfDownvoters.includes(userInfo.username)
    )

    // *********** post chunk setup below

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

    // *********** post full below

    if (loading) {
        return (<p>Loading</p>);
    }

    if (error) {
        return (<p>Error</p>);
    }

    console.log(data);
    console.log(data.postById);

    thePost = data.postById; //real data

    // *********** post chunk things that require thePost below
    // change to real data now that its available

    if (thePost.imageUrl) {
        oneImage = (
            <img width={500} src={thePost.imageUrl} alt='Custom-thing' />
        )
    }

    listOfUpvoters = thePost.upvotes.map(
        userObject => userObject.username
    )

    listOfDownvoters = thePost.downvotes.map(
        userObject => userObject.username
    )

    // *********** post chunk below

    const calIcon = { 'calendar-plus-o': 'right' }

    const calDropDown = [
        { google: 'Google Calendar' },
        { apple: 'Apple Calendar' }
    ]

    const calEvent = {
        title: thePost.title ? thePost.title : '',
        description: thePost.body ? thePost.body : '',
        location: thePost.place ? thePost.place : '',
        startTime: thePost.start ? thePost.start : '',
        endTime: thePost.end ? thePost.end : ''
    }

    return (
        <>
            <BackToFeed to="/feed">
                Back To Feed
            </BackToFeed>
            <DiscussionBoxSection>
                <OP>
                    {thePost.creator.username} -{' '}
                    <ReactTimeAgo date={thePost.date_created} />
                </OP>
                <DiscussionBox>
                    <LeftComponent>
                        <Upvote className={classes.root}>
                            <IconButton
                                style={isUpvoted ? { color: red[200] } : { color: grey[700] }}
                                onClick={e => {
                                    e.preventDefault()
                                    toggleUpvoted()
                                    upvotePost({
                                        variables: {
                                            netID: userInfo.netID,
                                            _id: thePost._id
                                        }
                                    })
                                }}
                            >
                                <ArrowDropUp fontSize='large' />
                            </IconButton>
                        </Upvote>
                        <Likes>
                            {thePost.upvotes.length -
                                thePost.downvotes.length}
                        </Likes>
                        <Downvote className={classes.root}>
                            <IconButton
                                style={isDownvoted ? { color: red[200] } : { color: grey[800] }}
                                onClick={e => {
                                    e.preventDefault()
                                    toggleDownvoted()
                                    downvotePost({
                                        variables: {
                                            netID: userInfo.netID,
                                            _id: thePost._id
                                        }
                                    })
                                }}
                            >
                                <ArrowDropDown fontSize='large' />
                            </IconButton>
                        </Downvote>
                    </LeftComponent>

                    <TopMiddleComponent>
                        <DiscussionTitleDiv>
                            <DiscussionTitle>{thePost.title}</DiscussionTitle>
                        </DiscussionTitleDiv>
                        <MoreOptions className={classes.root}>
                            <IconButton onClick={toggleDD}>
                                <MoreHorizIcon open={isDDOpen} />
                            </IconButton>
                            {isDDOpen && (
                                <DDMenu>
                                    <Save
                                        onClick={e => {
                                            e.preventDefault()

                                            const currentSavedPosts = userInfo.savedPosts.map(
                                                tup => tup._id
                                            )
                                            savePost({
                                                variables: {
                                                    netID: userInfo.netID,
                                                    savedPosts: [
                                                        ...currentSavedPosts,
                                                        thePost._id
                                                    ]
                                                }
                                            })

                                            console.log(userInfo.savedPosts)
                                        }}
                                    >
                                        Save Post
                  </Save>
                                    {(thePost.kind === 'Event' ||
                                        thePost.kind === 'Job') && (
                                            <AddTo>
                                                <AddToCalendar
                                                    event={calEvent}
                                                    buttonLabel='Add to '
                                                    buttonTemplate={calIcon}
                                                    listItems={calDropDown}
                                                ></AddToCalendar>
                                            </AddTo>

                                        )}

                                    <Report
                                        onClick={e => {
                                            e.preventDefault()

                                            reportPost({
                                                variables: {
                                                    netID: userInfo.netID,
                                                    _id: thePost._id
                                                }
                                            })
                                        }}
                                    >
                                        Report Post
                  </Report>

                                    {thePost.creator.username ===
                                        userInfo.username && (
                                            <Delete
                                                onClick={e => {
                                                    e.preventDefault()
                                                    removePost({
                                                        variables: {
                                                            _id: thePost._id
                                                        }
                                                    })
                                                }}
                                            >
                                                Delete Post
                                            </Delete>
                                        )}
                                </DDMenu>
                            )}
                        </MoreOptions>

                        <DiscussionBody>
                            {ReactHtmlParser(thePost.body)}
                        </DiscussionBody>

                        {oneImage}
                    </TopMiddleComponent>

                    <BottomComponent>
                        <Tags>
                            {thePost.tags.length > 0 && (
                                <Tag>{thePost.tags[0]}</Tag>
                            )}
                            {thePost.tags.length > 1 && (
                                <Tag>{thePost.tags[1]}</Tag>
                            )}
                            {thePost.tags.length > 2 && (
                                <Tag>{thePost.tags[2]}</Tag>
                            )}

                            {isTagsOpen &&
                                thePost.tags.slice(3).map(tag => <Tag>{tag}</Tag>)}

                            {thePost.tags.length > 3 && (
                                <ViewTags onClick={toggleTags}>
                                    {isTagsOpen ? (
                                        <text>(View Less)</text>
                                    ) : (
                                            <text>(View All)</text>
                                        )}
                                </ViewTags>
                            )}
                        </Tags>

                        <ShareFacebook>
                            <IconButton>
                                <FacebookIcon />
                            </IconButton>
                        </ShareFacebook>
                        <ShareTwitter>
                            <IconButton>
                                <TwitterIcon />
                            </IconButton>
                        </ShareTwitter>
                        <Share>
                            <IconButton>
                                <ShareIcon />
                            </IconButton>
                        </Share>
                    </BottomComponent>
                </DiscussionBox>
            </DiscussionBoxSection>
        </>
    )
}

export default PostFull