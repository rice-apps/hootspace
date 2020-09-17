import React, {useState} from 'react'
import SideNav from './SideNav'

import {
    LeftSidebarContainer,
    Background,
    AboutContainer,
} from './About.styles.js'

function AboutPage () {
    const [showProfile, setShowProfile] = useState(false)
    const [showWritePost, setShowWritePost] = useState(false)
    return (
        <div>
        <LeftSidebarContainer>
            <SideNav
            handleProfile={() => {
                setShowProfile(!showProfile)
                setShowWritePost(false)
            }}
            handleFeed={() => setShowProfile(!showProfile)}
            showProfile={showProfile}
            />
        </LeftSidebarContainer>
        <Background>
            <AboutContainer>

            </AboutContainer>
        </Background>
        </div>
        
    )
}

export default AboutPage