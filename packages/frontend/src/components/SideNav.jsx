import React, {useState} from 'react'
import ChatIcon from '@material-ui/icons/Chat'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import DateRangeIcon from '@material-ui/icons/DateRange'
import InfoIcon from '@material-ui/icons/Info'
import { SvgIcon } from '@material-ui/core'
import {
  Logo,
  NavList,
  NavElement,
  NavWrapper,
  ChatLogo
} from './SideNav.styles'
// import { Link, useLocation } from 'react-router-dom'

function SideNav (props) {
  // const location = useLocation()
  const pages = ['/profile', '/feed', '/calendar', '/mail', '/about']
  const [showAbout, setShowAbout] = useState(false)

  const getIcon = page => {
    switch (page) {
      case '/feed':
        return <ChatIcon />
      case '/mail':
        return <MailOutlineIcon />
      case '/profile':
        return <AccountBoxIcon />
      case '/calendar':
        return <DateRangeIcon />
      case '/about':
        return <InfoIcon />
      default:
        return <ChatIcon />
    }
  }

  const clickBehavior = {
    '/feed': props.handleFeed,
    '/profile': props.handleProfile,
    //'/about': setShowAbout(!showAbout),
    default: null
  }

  const selected = {
    '/feed': !props.showProfile,
    '/profile': props.showProfile,
    //'/about' : showAbout,
    default: false
  }

  return (
    <NavWrapper>
      <Logo>
        {/* Replace icon with something more professional or customized */}
        <ChatLogo />
      </Logo>
      <NavList>
        {/*{pages.map((page, i) => {*/}
        {/*  return (*/}
        {/*    <Link key={window.btoa(page)} to={'/' + page}>*/}
        {/*      <NavElement first={i === 0} selected={page === location.pathname}>*/}
        {/*        <SvgIcon*/}
        {/*          htmlColor={page === location.pathname ? `#FFFFFF` : `#A9ABB4`}*/}
        {/*          style={{ fontSize: '1.6vw' }}*/}
        {/*        >*/}
        {/*          {getIcon(page)}*/}
        {/*        </SvgIcon>*/}
        {/*      </NavElement>*/}
        {/*    </Link>*/}
        {/*  )*/}
        {/*})}*/}

        {pages.map((page, i) => {
          return (
            <NavElement
              first={i === 0}
              selected={selected[page] || selected[false]}
              onClick={clickBehavior[page] || clickBehavior['default']}
            >
              <SvgIcon
                htmlColor={
                  selected[page] || selected[false] ? `#FFFFFF` : `#A9ABB4`
                }
                style={{ fontSize: '3.5vh' }}
              >
                {getIcon(page)}
              </SvgIcon>
            </NavElement>
          )
        })}
      </NavList>
    </NavWrapper>
  )
}

export default SideNav
