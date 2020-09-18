import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import BackupIcon from '@material-ui/icons/Backup';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  mainline: {
    paddingLeft: '8vw'
  },
  sideText: {
    marginTop: '1vh'
  },
  paper: {
    padding: '6px 16px',
  },
  primaryTail: {
    backgroundColor: '#6DC8F9',
  },
}));

export default function ColorsTimeline() {
  const classes = useStyles();

  return (
    <Timeline align="alternate" className={classes.mainline}>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body1" color="white" className={classes.sideText}>
            September
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <BackupIcon />
          </TimelineDot>
          <TimelineConnector className={classes.primaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Deploy to students
            </Typography>
            <Typography>Prepare to launch the website to Rice students</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body1" color="white" className={classes.sideText}>
            October
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <FeedbackIcon/>
          </TimelineDot>
          <TimelineConnector className={classes.primaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Respond to Feedback
            </Typography>
            <Typography>Make any improvements based on feedback from the community</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body1" color="white" className={classes.sideText}>
            November
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <AddBoxIcon />
          </TimelineDot>
          <TimelineConnector className={classes.primaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Add New Features
            </Typography>
            <Typography>Add more useful features, such as a calendar or direct messaging system</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
          <Typography variant="body1" color="white" className={classes.sideText}>
            2021
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <MobileFriendlyIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Mobile
            </Typography>
            <Typography>Make the website compatible on mobile devices</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
