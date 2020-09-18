import styled from 'styled-components/macro'

import page404 from '../images/404page2.svg'

const Container404 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background: white;
  color: #272848;
  font-size: 1vw;
  padding: 0.25vw 1vw;
  border: 0.1vw solid #272848;
  border-radius: 0.3vw;
`

export { Image404, Container404, BackButton }
