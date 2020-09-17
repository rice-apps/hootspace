import styled, {css} from 'styled-components'

export const LeftSidebarContainer = styled.div`
  position: sticky;
  top: 0;

  /* margin-top: 12vh; */
  justify-self: center;
  width: 11vh;
  height: 100vh;
  // grid-column-start: 1;
  // grid-column-end: 2;
  // flex: 1;

  background-color: #ffffff;
  // background-color: orange;
  box-shadow: 0px 0px 0.2vw white;
  /* border-right: 0.16vw solid #ffffff; 
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px); */

  @media (max-aspect-ratio: 848/712) {
    height: 10vh;
    width: 100vw;
  }
`

export const Background = styled.div`
  display: flex;
  flex-direction: row;

  // grid-template-columns: 1fr 16fr;

  /* grid-template-columns: 1.2fr 1.75fr 2.25fr 1fr 1fr 1fr 0.5fr; */
  /* grid-template-rows: 12fr 12fr 1fr 1fr; */

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
    padding-bottom: .5vh;
`

export const TextDiv = styled.div `
    grid-column: 1 / 4;
    min-width: 0;
    font-family: AvenirLTStd-Book;
    margin-top: 5vh;
    color: #272848;
`;

export const PictureDiv = styled.div `
    grid-column: 5 / 8;
    font-family: AvenirLTStd-Book;
    color: white;
`;


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
    flex-direciton: row;
`

export const PictureText = styled.div`
    /* margin-left: 6vw;
    margin-right: auto; */
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