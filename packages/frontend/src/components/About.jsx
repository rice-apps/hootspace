import { useState } from 'react'
import SideNav from './SideNav'
import { useNavigate } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import SimpleAccordion from './MaterialAccordion.js'
import ColorsTimeline from './Timeline'
import FadeIn from 'react-fade-in'
import wyao from '../images/wyao.jpg'
import sgoyal from '../images/sgoyal.jpg'
import ccai from '../images/ccai.jpg'
import hqin from '../images/hqin.jfif'
import bzhang from '../images/bzhang.jpg'
import nhejduk from '../images/nhejduk.jpg'
import snidadavolu from '../images/snidadavolu.png'
import vsong from '../images/vsong.jpg'

import {
  LeftSidebarContainer,
  Background,
  AboutContainer,
  TextDiv,
  PictureDiv,
  DetailText,
  AckDiv,
  PictureText,
  Gap
} from './About.styles.js'

import {
  GuidelinesBoxSection,
  GuidelinesBox,
  GuidelinesBody,
  IndividualGuideline,
  FadedLine
} from './AboutGuidelines.styles.js'

const AboutCard = ({ name, description, image }) => {
  return (
    <Card style={{ width: '17vw', float: 'left', marginRight: '2vw' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          image={image}
          style={{ height: '35vh' }}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2' align='center'>
            {name}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            align='center'
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const SecondaryAboutCard = ({ name, description, image }) => {
  return (
    <Card
      style={{
        width: '17vw',
        float: 'left',
        marginLeft: 'auto',
        marginRight: '2vw',
        marginTop: '2vw'
      }}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          image={image}
          style={{ height: '35vh' }}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2' align='center'>
            {name}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            align='center'
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

function AboutPage () {
  const [showProfile] = useState(false)
  const navigator = useNavigate()
  return (
    <Background>
      <LeftSidebarContainer>
        <SideNav
          handleProfile={() => {
            navigator('/feed')
          }}
          handleFeed={() => {
            navigator('/feed')
          }}
          showProfile={showProfile}
        />
      </LeftSidebarContainer>
      <AboutContainer>
        <TextDiv>
          <FadeIn>
            <DetailText>Frequently Asked Questions:</DetailText>
            <SimpleAccordion title='Who can use hootspace?'>
              hootspace was created for the Rice University Community. A Net ID
              is required.
            </SimpleAccordion>
            <SimpleAccordion title='Do I need to download hootspace on my phone?'>
              No, hootspace is not a mobile device app. It was created as
              website to be accessible through all devices including desktop
              computers.
            </SimpleAccordion>
            <SimpleAccordion title='How do I sign up for hootspace?'>
              No sign up is necessary! All you need is your Rice Net ID to log
              onto the site.
            </SimpleAccordion>
            <SimpleAccordion title='I’ve signed in for the first time, now what?'>
              Fill out your profile page with your desired username. Now you can
              create and comment on posts!
            </SimpleAccordion>
            <SimpleAccordion title='How do I create a post?'>
              To create a post, simply click the "Create a Hoot" button on the
              top left corner of the feed page. There, you can select a category
              for the post, set a title, as well as add custom tags to the post.
            </SimpleAccordion>
            <SimpleAccordion title='How do I delete a post?'>
              To delete a post, click on the three dots on the top left-hand
              corner of your post, and there will be an option to delete your
              post.
            </SimpleAccordion>
            <SimpleAccordion title='Is my information shared with outside parties?'>
              No, your information is not shared outside the application. It is
              only used for communication within the Rice community.
            </SimpleAccordion>
            <Gap />
            <DetailText>Our Product Roadmap:</DetailText>
            <ColorsTimeline />
            <DetailText>Known Bugs and Issues:</DetailText>
            <AckDiv>
              <List
                component='nav'
                aria-label='contacts'
                style={{
                  marginLeft: '5vw',
                  marginRight: 'auto',
                  borderRadius: '2vh'
                }}
              >
                <ListItem style={{ fontSize: '10vw' }} button>
                  <ListItemIcon style={{ color: '#6D71F9' }}>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary='Improving load times and overall smoothness of the website' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon style={{ color: '#6D71F9' }}>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary='Sometimes logging in takes multiple tries' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon style={{ color: '#6D71F9' }}>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary='Improving the user interface for comments' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon style={{ color: '#6D71F9' }}>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary='Implementing the Calendar and direct messaging, as well as alerts' />
                </ListItem>
              </List>
            </AckDiv>
            <DetailText>Community Guidelines:</DetailText>
            <GuidelinesBoxSection>
              <GuidelinesBox>
                <GuidelinesBody>
                  <IndividualGuideline>
                    1. Be respectful of one another.
                  </IndividualGuideline>
                  <FadedLine />
                  <IndividualGuideline>
                    {' '}
                    2. Hate speech, slurs, discriminatory language targeting
                    specific groups is strictly banned from our page.
                  </IndividualGuideline>
                  <FadedLine />
                  <IndividualGuideline>
                    3. Hate speech, and malicious comments targeting any
                    individuals and/or organizations on campus is strictly
                    forbidden.
                  </IndividualGuideline>
                </GuidelinesBody>
              </GuidelinesBox>
            </GuidelinesBoxSection>
          </FadeIn>
        </TextDiv>
        <PictureDiv>
          <FadeIn>
            <PictureText>Meet The Team:</PictureText>
            <AboutCard
              name='Brandon Zhang'
              description='Developer - Duncan College'
              image={bzhang}
            />
            <AboutCard
              name='Henry Qin'
              description='Developer - Will Rice College'
              image={hqin}
            />
            <SecondaryAboutCard
              name='Nathaniel Hejduk'
              description='Developer - Duncan College'
              image={nhejduk}
            />
            <SecondaryAboutCard
              name='Shreya Nidadavolu'
              description='Developer - Wiess College'
              image={snidadavolu}
            />
            <SecondaryAboutCard
              name='William Yao'
              description='Developer - Will Rice College'
              image={wyao}
            />
            <SecondaryAboutCard
              name='Cloris Cai'
              description='Designer - Duncan College'
              image={ccai}
            />
            <SecondaryAboutCard
              name='Shryans Goyal'
              description='Team Lead - Will Rice College'
              image={sgoyal}
            />
            <SecondaryAboutCard
              name='Victor Song'
              description='Team Lead - Sid Rich College'
              image={vsong}
            />
          </FadeIn>
        </PictureDiv>
      </AboutContainer>
    </Background>
  )
}

export default AboutPage
