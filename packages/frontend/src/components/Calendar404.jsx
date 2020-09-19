import React from 'react'

import { Helmet } from 'react-helmet'
import { Image404, Container404, BackButton } from './Calendar404.styles'
import { useNavigate } from 'react-router-dom'

function Calendar404 () {
  const navigator = useNavigate()
  // const svgbutton = document.getElementById("button404");
  return (
    <Container404>
      <BackButton
        onClick={() => {
          navigator('/feed')
        }}
      >
        Back
      </BackButton>
      <Helmet>
        <title>hootspace &middot; 404</title>
      </Helmet>
      <Image404 />
    </Container404>
  )
}

export default Calendar404
