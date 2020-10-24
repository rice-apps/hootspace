import styled from 'styled-components/macro'

const GuidelinesBoxSection = styled.section`
  padding: 10px 70px 60px 70px;
  width: 35vw;
  height: 20vh;
  margin-right: auto;
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
  grid-area: body;
  padding-right: 5%;
  padding-left: 5%;
  font-family: 'Avenir';
  font-size: 1.9vh;
  line-height: 200%;
  margin-left: -40%;
`

const IndividualGuideline = styled.p`
  font-family: 'Avenir';
  font-size: 2vh;
  line-height: 200%;
  font-weight: bold;
`

const FadedLine = styled.p`
  height: 1px;
  padding: 0px;
  background-color: #e6e6e6;
  margin-left: 0%;
  width: auto;
  background-image: linear-gradient(to left, white 2%, #e6e6e6 50%, white 98%);
  background-image: -webkit-gradient(
    linear,
    left bottom,
    right bottom,
    color-stop(0.02, white),
    color-stop(0.5, gray),
    color-stop(0.98, white)
  );
`

export {
  GuidelinesBoxSection,
  GuidelinesBox,
  GuidelinesTitleDiv,
  GuidelinesTitle,
  GuidelinesBody,
  IndividualGuideline,
  FadedLine
}
