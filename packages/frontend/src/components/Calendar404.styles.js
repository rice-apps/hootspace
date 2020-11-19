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
  outline: none;
  border-radius: 2vw;
  cursor: pointer;
  :hover {
    text-decoration: underline;
    box-shadow: 2px 8px 5px -5px #b19cd9;
  }
`

export { Image404, Container404, BackButton }
