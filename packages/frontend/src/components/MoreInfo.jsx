import { useState, useCallback, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'
import { Helmet } from 'react-helmet-async'
import log from 'loglevel'
import { SET_INFO } from '../graphql/Mutations'
import { USER_EXISTS, VERIFY_USER } from '../graphql/Queries'
import laptopGirl from '../images/Page 2.svg'
import majorMinorJson from '../utils/MajorMinor.json'
import DropDownItem from './DropDownItem'
import SearchBar from './Search'
import {
  FullGrid,
  PinkShape,
  LaptopGirl,
  AboutMyself,
  TextField,
  FieldSetStyle,
  TotalForm,
  MarginsForm,
  SubmitButton,
  DDWrapper,
  DDHeader,
  DDHeaderTitle,
  DDList,
  DDListItem,
  ArrowI
} from './MoreInfo.styles'
import { currentUser, loadToken } from '../utils/apollo'

function MoreInfo () {
  const navigate = useNavigate()

  const [userStatement, setStatement] = useState('Valid!')
  const [, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [major, setMajor] = useState([])
  const [minor, setMinor] = useState([])
  const [college, setCollege] = useState('')
  const [isMajorOpen, setMajorOpen] = useState(false)
  const [isMinorOpen, setMinorOpen] = useState(false)
  const [isCollegeOpen, setCollegeOpen] = useState(false)

  const [majorSearchActivated, setMajorsActive] = useState(false)
  const [minorSearchActivated, setMinorsActive] = useState(false)
  const [filteredMajors, setFilteredMajors] = useState([])
  const [filteredMinors, setFilteredMinors] = useState([])

  const [addInfo] = useMutation(SET_INFO)
  const [
    checkUser,
    { data: userExists, loading: userExistLoading }
  ] = useLazyQuery(USER_EXISTS)
  const data = currentUser()

  const majors = majorMinorJson.majors.split(';')

  const finalizedMajors = majorSearchActivated ? filteredMajors : majors

  const minors = majorMinorJson.minors.split(';')

  const finalizedMinors = minorSearchActivated ? filteredMinors : minors

  const colleges = majorMinorJson.colleges.split(';')

  useEffect(() => {
    checkUser({
      variables: {
        username
      }
    })
  }, [username])

  useEffect(() => {
    log.info(username)
    const isMyUsernameTaken = userExists?.doesUsernameExist
    setStatement('valid username!')
    if (username === '') {
      setStatement('you need a username')
    }
    if (isMyUsernameTaken) {
      setStatement('somebody already took that username lol')
    }
  }, [userExists?.doesUsernameExist])

  const handleUserChange = useCallback(e => {
    setUsername(e.target.value)
  }, [])

  const handleMajorChange = newValue => {
    const indexOfMajor = major.indexOf(newValue)
    setMajor(
      indexOfMajor >= 0
        ? major.filter(maj => newValue !== maj)
        : [...major, newValue]
    )
    setMajorOpen(false)
  }

  const handleMinorChange = newValue => {
    const indexOfMinor = minor.indexOf(newValue)
    setMinor(
      indexOfMinor >= 0
        ? minor.filter(maj => newValue !== maj)
        : [...minor, newValue]
    )
    setMinorOpen(false)
  }

  const handleCollegeChange = newValue => {
    const indexOfCollege = college.indexOf(newValue)
    setCollege(indexOfCollege >= 0 ? '' : newValue)
    setCollegeOpen(false)
  }

  const toggleMajor = () => {
    setMajorOpen(!isMajorOpen)
    setMinorOpen(false)
    setCollegeOpen(false)
  }
  const toggleMinor = () => {
    setMinorOpen(!isMinorOpen)
    setMajorOpen(false)
    setCollegeOpen(false)
  }
  const toggleCollege = () => {
    setCollegeOpen(!isCollegeOpen)
    setMajorOpen(false)
    setMinorOpen(false)
  }

  if (currentUser() === {}) {
    return <Navigate to='/login' />
  }

  if (!data?.isNewUser) {
    log.info('Navigating....')
    return <Navigate to='/feed' />
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      log.info({
        major: major.toString(),
        minor: minor.toString(),
        college,
        netID: data.netID,
        username
      })

      if (userExistLoading || userExists?.doesUsernameExist) {
        return
      }

      currentUser({ ...data, isNewUser: false })
      try {
        await addInfo({
          variables: {
            username,
            college,
            major,
            minor,
            isNewUser: false
          },
          refetchQueries: [
            {
              query: VERIFY_USER,
              variables: {
                token: loadToken()
              }
            }
          ]
        })
      } catch (error) {
        return
      }
      navigate('/feed')
    } catch (error) {
      log.error(error)
    } finally {
      setLoading(false)
    }
  }

  // have to manually push newUser
  return (
    <>
      <Helmet>
        <title>RiceDiscuss &middot; More Info</title>
      </Helmet>
      <FullGrid>
        <PinkShape>
          <>
            <AboutMyself>A little about myself...</AboutMyself>
            <LaptopGirl src={laptopGirl} alt='Girl with laptop' />
          </>

          <MarginsForm onSubmit={handleSubmit}>
            <TotalForm>
              <div
                style={{
                  display: 'flex',
                  'flex-direction': 'column',
                  'align-items': 'flex-start'
                }}
              >
                <p>{userStatement}</p>
                <FieldSetStyle>
                  <TextField
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={handleUserChange}
                  />
                </FieldSetStyle>
              </div>
              <p>current majors: {major.toString()}</p>
              <SearchBar
                items={majors}
                setList={setFilteredMajors}
                setActive={setMajorsActive}
                placeholder='search majors'
              />
              <DDWrapper>
                <DDHeader onClick={toggleMajor}>
                  <DDHeaderTitle>
                    Majors
                    <ArrowI open={isMajorOpen} />
                  </DDHeaderTitle>
                </DDHeader>
                {isMajorOpen && (
                  <DDList>
                    {finalizedMajors.sort().map(item => (
                      <DDListItem key={item}>
                        <DropDownItem
                          name={item}
                          setInfo={handleMajorChange}
                          selectedItems={major}
                        />
                      </DDListItem>
                    ))}
                  </DDList>
                )}
              </DDWrapper>

              <p>current minors: {minor.toString()}</p>
              <SearchBar
                items={minors}
                setList={setFilteredMinors}
                setActive={setMinorsActive}
                placeholder='search minors'
              />
              <DDWrapper>
                <DDHeader onClick={toggleMinor}>
                  <DDHeaderTitle>
                    Minors
                    <ArrowI open={isMinorOpen} />
                  </DDHeaderTitle>
                </DDHeader>
                {isMinorOpen && (
                  <DDList>
                    {finalizedMinors.sort().map(item => (
                      <DDListItem key={item}>
                        <DropDownItem
                          name={item}
                          setInfo={handleMinorChange}
                          selectedItems={minor}
                        />
                      </DDListItem>
                    ))}
                  </DDList>
                )}
              </DDWrapper>

              <DDWrapper>
                <DDHeader onClick={toggleCollege}>
                  <DDHeaderTitle>
                    {college === '' ? 'College' : college.replace('_', ' ')}
                    <ArrowI open={isCollegeOpen} />
                  </DDHeaderTitle>
                </DDHeader>
                {isCollegeOpen && (
                  <DDList>
                    {colleges.map(item => (
                      <DDListItem key={item}>
                        <DropDownItem
                          name={item}
                          alias={item.replace('_', ' ')}
                          setInfo={handleCollegeChange}
                          selectedItems={college}
                        />
                      </DDListItem>
                    ))}
                  </DDList>
                )}
              </DDWrapper>
              <SubmitButton
                type='submit'
                disabled={userExists?.doesUsernameExist}
              >
                &rarr;
              </SubmitButton>
            </TotalForm>
          </MarginsForm>
        </PinkShape>
      </FullGrid>
    </>
  )
}

export default MoreInfo
