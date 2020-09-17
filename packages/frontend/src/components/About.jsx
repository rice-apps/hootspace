import React, {useState} from 'react'
import SideNav from './SideNav'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SimpleAccordion from './MaterialAccordion.js';
import ColorsTimeline from './Timeline.js';
import FadeIn from 'react-fade-in';
import wyao from '../images/wyao.jpg';
import sgoyal from '../images/sgoyal.jpg';
import ccai from '../images/ccai.jpg';

import {
    LeftSidebarContainer,
    Background,
    AboutContainer,
    TextDiv,
    PictureDiv,
    DetailText,
    AcknowledgementText,
    AckDiv,
    PictureText,
    Gap,
} from './About.styles.js'

const AboutCard = ({name, description, image}) => {
    return (
        <Card style={{ width: '17vw', float: 'left', marginRight: '2vw' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={image}
                    style = {{ height: '35vh'}}
                    title={name}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                    {description}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const SecondaryAboutCard = ({name, description, image}) => {
    return (
        <Card style={{ width: '17vw', float: 'left', marginLeft: 'auto', marginRight: '2vw', marginTop:'2vw'}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={image}
                    style = {{ height: '35vh'}}
                    title={name}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                    {description}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

function AboutPage () {
    const [showProfile, setShowProfile] = useState(false)
    const [showWritePost, setShowWritePost] = useState(false)
    return (
        <Background>
            <LeftSidebarContainer>
                <SideNav
                handleProfile={() => {
                    setShowProfile(false)
                    setShowWritePost(false)
                }}
                handleFeed={() => setShowProfile(!showProfile)}
                showProfile={showProfile}
                />
            </LeftSidebarContainer>
            <AboutContainer>
            <TextDiv>
                <FadeIn>
                <DetailText>
                    Frequently Asked Questions:
                </DetailText>
                <SimpleAccordion title="Who can use Carpool?">
                    Carpool was created for the Rice University Community. A Net ID is required.
                </SimpleAccordion>
                <SimpleAccordion title="Do I need to download Carpool on my phone?">
                    No, Carpool is not a mobile device app. It was created as website to be accessible through all devices including desktop computers.
                </SimpleAccordion>
                <SimpleAccordion title="How do I sign up for Carpool?">
                    No sign up is necessary! All you need is your Rice Net ID to log onto the site: carpool.riceapps.org
                </SimpleAccordion>
                <SimpleAccordion title="I’ve signed in for the first time, now what?">
                    Fill out your profile page with your first name, last name, and phone number.
                    Now you can join and create rides!
                </SimpleAccordion>
                <SimpleAccordion title="How do I see my past and future rides?">
                    You can find the rides you’ve taken in the past and the rides you’ve scheduled listed on your profile.
                </SimpleAccordion>
                <SimpleAccordion title="If I leave a ride, will the ride disappear?">
                    If you created a ride and were the only one on the ride, the ride will be deleted. If you joined a ride with other existing riders, the ride will exist but you will not be listed as a rider.
                </SimpleAccordion>
                <SimpleAccordion title="How can I delete a ride?">
                    You can access the rides you have created your profile page. Clicking on the ride card brings you to a page where you can delete your ride via the
                    "Delete this ride" button. Alternatively, you can see the rides you have created on the find ride page, and you can delete them from there.
                </SimpleAccordion>
                <SimpleAccordion title="Is my information shared with outside parties?">
                    No, your information is not shared outside the application. It is only used for coordinating rides with your fellow Rice Owls.
                </SimpleAccordion>
                <Gap />
                <DetailText>
                    Our Product Roadmap:
                </DetailText>
                <ColorsTimeline />
                </FadeIn>
            </TextDiv>
            <PictureDiv>
                <FadeIn>
                <PictureText>
                    Meet The Team:
                </PictureText>
                <AboutCard name="Winnie Li" description="Team Lead - McMurtry College" image={wyao} />
                <AboutCard name="Will Mundy" description="Mentor - Sid Richardson College" image={wyao}/>
                <SecondaryAboutCard name="Guancong Jia" description="Developer - Brown College" image={wyao} />
                <SecondaryAboutCard name="William Yao" description="Developer - Will Rice College" image={wyao} />
                <SecondaryAboutCard name="Shryans Goyal" description="Mentor - Will Rice College" image={sgoyal} />
                <SecondaryAboutCard name="Helena Hu" description="Designer - Jones College" image={wyao} />
                <SecondaryAboutCard name="Cloris Cai" description="Designer - Duncan College" image={ccai} />
                </FadeIn>
            </PictureDiv>
            </AboutContainer>
        </Background>
    )
}

export default AboutPage