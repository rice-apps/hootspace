import styled, { css } from 'styled-components/macro'

const GuidelinesBoxSection = styled.section`
  padding: 10px 70px 60px 70px;
  width: 65vw;
  height: 15vh;
`

const GuidelinesBox = styled.section`
  padding: 30px 40px;
  background: #ffffff;
  border-radius: 20px;
  display: grid;
  grid-template-areas: 'title body';
  grid-template-columns: 9vw 1fr;
`

const GuidelinesTitleDiv = styled.div`
  grid-area: title;
  align-self: center;
  justify-self: start;
  border-right: 2px solid #7380ff;
`

const GuidelinesTitle = styled.text`
  font-family: 'Avenir';
  font-size: 2vh;
  font-weight: bold;
  letter-spacing: 1.38px;
  line-height: 150%;
`

const GuidelinesBody = styled.text`
  margin-left: 20px;
  grid-area: body;
  font-family: 'Avenir';
  font-size: 1.9vh;
  line-height: 200%;
`

export {
  GuidelinesBoxSection,
  GuidelinesBox,
  GuidelinesTitleDiv,
  GuidelinesTitle,
  GuidelinesBody
}
