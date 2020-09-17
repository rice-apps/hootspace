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
  // display: grid;
  display: flex;
  flex-direction: row;

  // grid-template-columns: 1fr 16fr;

  /* grid-template-columns: 1.2fr 1.75fr 2.25fr 1fr 1fr 1fr 0.5fr; */
  /* grid-template-rows: 12fr 12fr 1fr 1fr; */

  // background-color: #f4efef;
  background-color: #eff0f8;
  // background-color: #bada55;

  @media (max-aspect-ratio: 848/712) {
    flex-direction: column;
  }
`

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  // order: 3;

  // grid-column-start: 2;
  flex: 16 // background-color: green;
    ${props =>
      props.shrink &&
      css`
        // width: 10%;
        justify-self: center;
      `};

  // @media (min-aspect-ratio: 848/712) {
  //   background-color: red;
  // }
`