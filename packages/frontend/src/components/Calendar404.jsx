import { Helmet } from 'react-helmet-async'
import { CalendarContainer, Background, InnerContainer } from './Calendar404.styles'
import {
    LeftSidebarContainer,
} from "./PostFeedWithData.styles";
import SideNav from "./SideNav";
import IFrame from 'react-iframe';
import { useNavigate } from "react-router-dom";
import React from "react";

function Calendar404 () {
  const navigator = useNavigate();
  return (
      <>
          <Helmet>
              <title>hootspace &middot; calendar</title>
          </Helmet>
          <Background>
              <LeftSidebarContainer>
                  <SideNav
                      handleProfile={() => {
                          navigator('/feed')
                      }}
                      handleFeed={() => {
                          navigator('/feed')
                      }}
                  />
              </LeftSidebarContainer>
              <CalendarContainer>
                  <InnerContainer>
                      <IFrame
                          url="https://calendar.google.com/calendar/embed?src=sv1174rvelumh2d28tg1s6rumo%40group.calendar.google.com&ctz=America%2FChicago"
                          width="99.5%" height="99.5%" />
                  </InnerContainer>
              </CalendarContainer>
          </Background>
      </>
  )
}

export default Calendar404
