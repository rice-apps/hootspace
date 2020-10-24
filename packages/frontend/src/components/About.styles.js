import styled from 'styled-components/macro'

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

export const Background = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #eff0f8;

  @media (max-aspect-ratio: 848/712) {
    flex-direction: column;
  }
`

export const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-left: 5vh;
  margin-right: 5vh;
  width: 95vw;
  height: auto;
  padding-bottom: 0.5vh;
`

export const TextDiv = styled.div`
  grid-column: 1 / 4;
  min-width: 0;
  font-family: AvenirLTStd-Book;
  margin-top: 5vh;
  color: #272848;
`

export const PictureDiv = styled.div`
  grid-column: 5 / 8;
  font-family: AvenirLTStd-Book;
  color: white;
`

export const DetailText = styled.div`
  font-family: Verdana;
  font-size: 2vw;
  margin-left: 6vw;
  margin-right: auto;
  margin-bottom: 2vh;
  text-align: left;
  line-height: 2;
`

export const AcknowledgementText = styled.div`
  font-size: 1.5vw;
  margin-left: 6vw;
  margin-right: auto;
  text-align: left;
  line-height: 2;
`

export const AckDiv = styled.div`
  display: flex;
  flex-direction: row;
`

export const PictureText = styled.div`
  text-align: left;
  font-family: Verdana;
  font-size: 2vw;
  line-height: 2;
  color: #272848;
  margin-top: 5vh;
  margin-bottom: 2vh;
`

export const Gap = styled.div`
  min-height: 5vh;
`
