import {
  GuidelinesBoxSection,
  GuidelinesBox,
  GuidelinesTitle,
  GuidelinesTitleDiv,
  GuidelinesBody
} from './GuidelinesBanner.styles'

function GuidelinesBanner () {
  return (
    <GuidelinesBoxSection>
      <GuidelinesBox>
        <GuidelinesTitleDiv>
          <GuidelinesTitle>COMMUNITY GUIDELINES</GuidelinesTitle>
        </GuidelinesTitleDiv>
        <GuidelinesBody>
          1. Be respectful of one another. <br />
          2. Hate speech, slurs, discriminatory language targeting specific
          groups is strictly banned from our page. <br />
          3. Hate speech, and malicious comments targeting any individuals
          and/or organizations on campus is strictly forbidden.
        </GuidelinesBody>
      </GuidelinesBox>
    </GuidelinesBoxSection>
  )
}

export default GuidelinesBanner
