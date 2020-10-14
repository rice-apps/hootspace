import styled, { css } from 'styled-components/macro'
import LogoUrl from '../images/smalllogo.svg'

export const ChatLogo = styled.div`
  width: 9vh;
  height: 9vh;
  background-image: url(${LogoUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 95%;
`

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 7vh;
  padding-bottom: 10vh;

  @media (max-aspect-ratio: 848/712) {
    width: 25vw;
    padding-top: 0;
    padding-bottom: 0;
  }
`

export const NavList = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
  align-items: center;

  z-index: 12;

  height: 45vh;

  @media (max-aspect-ratio: 848/712) {
    flex-direction: row;
    width: 100%;
    height: inherit;
  }
`

export const NavElement = styled.div`
  height: 5.6vh;
  width: 5.6vh;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.72vh;
  border: 2px solid transparent;

  z-index: 13;

  cursor: pointer;

  ${props =>
    !props.selected &&
    css`
      transition: background-color 0.3s ease-in-out;
      &:hover {
        background-color: rgba(229, 230, 247, 0.7);
      }
    `}

  ${props =>
    props.selected &&
    css`
      background-color: #7380ff;
      box-shadow: 0 0.7vh 1vh -1vh black;
    `}
`

export const NavWrapper = styled.div`
  background-color: #ffffff;
  height: 100%;

  z-index: 80;

  @media (max-aspect-ratio: 848/712) {
    height: 10vh;
    display: flex;
    flex-direction: row;
    width: 100vw;
    justify-content: space-evenly;
  }
`
