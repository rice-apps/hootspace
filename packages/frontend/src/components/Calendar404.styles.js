import styled from 'styled-components/macro'

import page404 from '../images/404page2.svg'

const Container404 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f8;
`

const Image404 = styled.div`
  width: 100vw;
  height: 100vw;
  background-image: url(${page404});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`

const BackButton = styled.button`
  position: absolute;
  top: 60%;
  left: 14.4%;
  z-index: 3;
  background: white;
  color: #272848;
  font-size: 1vw;
  padding: 1vw 4vw;
  border: 0.2vw solid #272848;
  border-radius: 2vw;
`

const Background = styled.div`
  display: flex;
  flex-direction: row;
  // background-color: #eff0f8;
  width: 100vw;
  height: 100vh;
  background-color: red;
  @media (max-aspect-ratio: 848/712) {
    flex-direction: column;
  }
`

const CalendarContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #eff0f8;
    z-index: 365;
    
    display: flex;
    align-items: center;
    justify-content: center;
`

const InnerContainer = styled.div`
    width: 80%;
    height: 90%;
    border-color: #9a9a9a;
    border-width: medium;
    border-style: solid;
`

export { Image404, Container404, BackButton, CalendarContainer, Background, InnerContainer }
