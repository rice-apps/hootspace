import styled, { css } from 'styled-components/macro'

// note: PostFull.styles.js is based on this file
// so please make relevant design updates to both places

// Contains Discussion Box
const DiscussionBoxSection = styled.section`
  padding: 20px 70px;
  min-width: 55vw;
  max-width: 65vw;
`
// contains LeftComponent, TopMiddleComponent, BottomComponent

const DiscussionBox = styled.section`
  padding: 5px;
  background: #ffffff;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 8vh 1fr auto;
  grid-template-columns: 5vw 1fr;
  grid-template-areas:
    'owo top'
    'left topmiddle'
    'left comments';
`

// contains OriginalPoster, Tags, DividerTop

const TopComponent = styled.div`
  grid-area: top;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 6vh 1vh;
  grid-template-areas:
    'op . tags'
    'line line line';
  margin-top: 1vh;
`

const OriginalPosterDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'oppic opname'
    'oppic timeago';
  grid-area: op;
  white-space: nowrap;

`

const OriginalPosterPic = styled.div`
  grid-area: oppic;
`

const OriginalPosterName = styled.div`
  grid-area: opname;
  padding: 0.5vh 0vw 0vh 1vw;
  font-weight: bold;
  font-size: 2.1vh;
`

const TimeAgoDiv = styled.div`
  grid-area: timeago;
  padding: 0.5vh 0vw 0vh 1vw;
  color: #A0A1B6;
  font-size: 1.9vh;
`

// contains Tag, ViewTags

const Tags = styled.div`
  grid-area: tags;
  word-wrap: break-word;
  text-align: right;
  margin-top: 1.5vh;
  margin-right: 7vw;
`

const Tag = styled.text`
  font-family: 'Avenir';
  font-size: 1.9vh;
  font-weight: bold;
  color: white;
  background-color: gray;
  border: none;
  border-radius: 1vw;
  margin-right: 0.5vw;
  padding: 1vh 0.5vw;
  align-items: center;
`

const ViewTags = styled.button`
  border: none;
  background-color: inherit;
`

const DividerTop = styled.div`
  grid-area: line;
`

// contains Upvote, Downvote, Likes

const LeftComponent = styled.div`
  grid-area: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Upvote = styled.div`
  grid-row: 2/3;
  width: 4vw;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Likes = styled.div`
  grid-row: 3/4;
  width: 4vw;
  text-align: center;
  font-size: 2vh;
`

const Downvote = styled.div`
  grid-row: 4/5;
  width: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

// contains DiscussionTitle, MoreOptions, DiscussionBody

const TopMiddleComponent = styled.div`
  position: relative;
  grid-area: topmiddle;
  display: grid;
  grid-template-areas:
    'title kind moreoptions'
    'body body moreoptions'
    'image image moreoptions'
    'desc desc moreoptions';
  grid-template-columns: auto 1fr 5vw;
  grid-template-rows: auto auto auto auto;
`

const DiscussionTitle = styled.text`
  grid-area: title;
  padding: 3vh 0.5vw 0px 0px;
  font-family: 'Avenir';
  font-size: 2.3vh;
  font-weight: bold;
  min-height: 4vh;
  line-height: 150%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: start;
`

const FullPostLink = styled.text`
  color: black;
  text-decoration: none;
`

const KindDiv = styled.div`
  grid-area: kind;
  padding: 2vh 0px 0px 0px;
  align-self: center;
`

const Kind = styled.text`
  font: normal normal 900 15px/20px Avenir;
  color: #7380ff;
  border: 1px solid #7380ff;
  border-radius: 5px;
  opacity: 1;
  font-size: 2vh;
  margin-left: 10px;
  padding: 2px 5px;
  align-self: start;
`

const MoreOptions = styled.div`
  position: relative;
  grid-area: moreoptions;
  align-self: start;
  justify-self: center;
  margin-top: -9vh;
  margin-right: 1.5vw;
`

const DDMenu = styled.div`
  position: absolute;
  top: 5vh;
  left: 2vh;
  z-index: 4;
  background-color: white;
  display: grid;
  width: 15vh;
`

const Save = styled.button`
  padding: 0.5vh;
`

const Expand = styled.button`
  padding: 0.5vh;
`

const AddTo = styled.button`
  padding: 0.5vh;
`

const Report = styled.button`
  padding: 0.5vh;
`

const Delete = styled.button`
  padding: 0.5vh;
`

const DiscussionBody = styled.text`
  grid-area: body;
  padding: 0vh 0px 1vh 0px;
  font-size: 2vh;
  display: inline-block;
  line-height: 150%;
  white-space: normal;
  overflow-wrap: break-word;
`

const ReadMore = styled.text`
  font: normal normal normal 1.75vh Avenir;
  letter-spacing: 0px;
  color: #9293a3;
  text-align: right;
  text-decoration: underline;
`

const ImageDiv = styled.div`
  grid-area: image;
`
const DescriptorDiv = styled.div`
  grid-area: desc;
`

// contains DividerBottom, ShowCommentsDiv, NewCommentDiv, PostCommentDiv, CommentsDiv

const CommentComponent = styled.div`
  grid-area: comments;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1vh 6vh auto auto auto;
  grid-template-areas:
    'dividerbottom'
    'showcomments'
    'commentinput'
    'commentbutton'
    'commentsdiv';
`
const DividerBottom = styled.div`
  grid-area: dividerbottom;
`
const ShowCommentsDiv = styled.div`
  grid-area: showcomments;
  padding: 1vh 0px;
`

const CommentInput = styled.input`
  grid-area: commentinput;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 20px;

  width: 40vw;
  height: auto;
  min-height: 5vh;

  overflow-y: auto;

  padding-left: 0.5vw;
  padding-top: 0.5vh;
  margin-left: 1vw;

  text-align: left;
  font: normal normal medium 16px/22px Avenir;
  letter-spacing: 0px;
  opacity: 1;
`

// based off posting button in WritePost styles
const CommentButton = styled.button`
  grid-area: commentbutton;
  position: relative;
  padding: 0.5vh 1vw;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  margin: 1vh 0px 0px 2vw;
  &:hover {
    background-color: #e7c6c6;
    opacity: 100%;
  }
  width: 10vw;
  height: 4vh;
  background: #7380ff 0% 0% no-repeat padding-box;
  border-radius: 20px;
  opacity: 1;
  font: Medium 20px/17px Avenir;
  letter-spacing: 0px;
  color: #747886;
  border: none;
`
const CommentButtonText = styled.text`
  font: normal normal 700 1.1vw Avenir;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`
const BoldedSpan = styled.span`
  font-weight: 600;
`

const NormalSpan = styled.span`
  font-size: 2vh;
  margin-right: 0.7rem;
`

const CommentsDiv = styled.div`
  grid-area: commentsdiv;
`

const Pic = styled.div`
  width: 5.37vh;
  height: 5.37vh;
  border-radius: 20%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  ${props =>
    css`
      background-image: url(${props.src});
    `}
`

export {
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
}
