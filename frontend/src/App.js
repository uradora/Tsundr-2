import React, { useState, useEffect } from 'react'
import profileService from './services/profiles'
import loginService from './services/login'
import Profilecards from './components/Profilecards'
import './styles/header.css'

const App = () => {
  const [profiles, setProfiles] = useState([])
  const [profileToShow, setProfileToShow] = useState(null)
  const [page, setPage] = useState('home')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    profileService.getAll().then((profiles) => setProfiles(profiles))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //blogService.setToken(user.token);
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInUser');
  }

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

  const pageContent = () => {
    if (page == 'home') {
      return <Profilecards profiles={profiles} />
    } else if (page == 'profile') {
      return <Profile />
    } else if (page == 'chats') {
      return <Chats />
    }
  }

  if (user === null) {
    return (
      <div>
      <form onSubmit={handleLogin}>
          <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
        </div>
    )
  } else {
    return (
      <div className="list-wrapper">
        {pageContent()}
      </div>
    )
  }


}


export default App