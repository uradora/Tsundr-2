import React, { useState, useEffect } from 'react'
import profileService from './services/profiles'
import Profilecards from './components/Profilecards'
import PersonIcon from '@material-ui/icons/Person'
import ForumIcon from '@material-ui/icons/Forum'
import IconButton from '@material-ui/core/IconButton'
import './styles/header.css'

const App = () => {
  const [profiles, setProfiles] = useState([])
  const [profileToShow, setProfileToShow] = useState(null)
  const [page, setPage] = useState('home')

  useEffect(() => {
    profileService.getAll().then((profiles) => setProfiles(profiles))
    .then(console.log(profiles))
  }, [])

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const getProfile = (id) => {
    profileService
      .getProfile(id)
      .then(returnedProfile => {
        setProfileToShow(returnedProfile)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }

  const addProfile = (newProfile) => {
    profileService
      .createProfile(newProfile)
      .then(returnedProfile => {
        setProfiles(profiles.concat(returnedProfile))
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  } 
  const Profile = () => (
    <div><h2>User Profile Here</h2></div>
  )
  
  const Chats = () => (
    <div><h2>Chat page here</h2></div>
  )

  const Header = () => {
    return (
      <div className='header'>
        <IconButton onClick={toPage('profile')}>
          <PersonIcon className='headericon' fontSize='medium' />
        </IconButton>
        <a href="" onClick={toPage('home')}>
          <h2>OwO</h2>
        </a>
        <IconButton onClick={toPage('chats')}>
          <ForumIcon className='headericon' fontSize='medium' />
        </IconButton>
      </div>
    )
  }
  

  const pageContent = () => {
    if (page == 'home') {
      return <Profilecards profiles={profiles} />
    } else if (page == 'profile') {
      return <Profile />
    } else if (page == 'chats') {
      return <Chats />
    }
  }

  return (
    <div className="App">
      <Header />
      {pageContent()}
    </div>
  )


}


export default App