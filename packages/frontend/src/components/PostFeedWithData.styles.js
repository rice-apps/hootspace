import styled, { css } from 'styled-components/macro'

export const Background = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #eff0f8;

  @media (max-aspect-ratio: 848/712) {
    flex-direction: column;
  }
`

export const FeedProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 16;
  ${props =>
    props.shrink &&
    css`
      justify-self: center;
    `};
`

export const PostFeedContainer = styled.div`
  /* margin-top: 8.6vh; */

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 16;

  background-color: #eff0f8;
`

export const BannerContainer = styled.div`
  padding: 50px;
  width: 70%;
`

export const LeftSidebarContainer = styled.div`
  position: sticky;
  top: 0;

  justify-self: center;
  width: 11vh;
  height: 100vh;

  background-color: #ffffff;
  box-shadow: 0px 0px 0.2vw white;

  @media (max-aspect-ratio: 848/712) {
    height: 10vh;
    width: 100vw;
  }
`

export const RightSidebarContainer = styled.div`
  position: sticky;
  top: 0;

  justify-self: center;
  height: 100vh;
  box-shadow: 0px 0px 0.2vw white;
`
export const NewPostButtonContainer = styled.div`
  padding-top: 1vh;

  width: 47vw;
  height: 3vw;

  justify-content: space-between;
`

export const NewPostButton = styled.div`
  display: flex;

  width: 10vw;
  height: 2.3vw;

  cursor: pointer;

  background: #ffffff93 0% 0% no-repeat padding-box;
  box-shadow: 0.1vw 0.1vw 0.5vw #7478861a;
  border-radius: 0.7vw;

  justify-content: flex-start;
  align-items: center;

  padding-left: 0.8vw;
  margin-left: -4vw;
  margin-top: 3vw;
`

export const ButtonText = styled.div`
  font-size: 0.9vw;
  padding-left: 1.3vw;
  padding-bottom: 0.2vw;
`
