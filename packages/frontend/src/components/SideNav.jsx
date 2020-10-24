import React from 'react'
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
import { useNavigate, useLocation } from 'react-router-dom'

function SideNav (props) {
  const location = useLocation()
  const pages = ['/profile', '/feed', '/calendar', '/mail', '/about']
  const navigator = useNavigate()

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
    '/calendar': () => navigator('/calendar'),
    '/mail': () => navigator('/mail'),
    '/about': () => navigator('/about'),
    default: null
  }

  const selected = {
    '/feed': location.pathname === '/feed' && !props.showProfile,
    '/profile': location.pathname === '/feed' && props.showProfile,
    '/about': location.pathname === '/about',
    default: false
  }

  return (
    <NavWrapper>
      <a href='/feed'>
        <Logo>
          {/* Replace icon with something more professional or customized */}
          <ChatLogo />
        </Logo>
      </a>
      <NavList>
        {pages.map((page, i) => {
          return (
            <NavElement
              key={i}
              first={i === 0}
              selected={selected[page] || selected.false}
              onClick={clickBehavior[page] || clickBehavior.default}
            >
              <SvgIcon
                htmlColor={
                  selected[page] || selected.false ? '#FFFFFF' : '#A9ABB4'
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
