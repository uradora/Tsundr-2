import React, { useState, useEffect } from 'react'
import profileService from './services/profiles'
import loginService from './services/login'
import Profilecards from './components/Profilecards'
import Header from './components/Header'
import './styles/header.css'
import './styles/app.css'

const App = () => {
  const [profiles, setProfiles] = useState([])
  const [profileToShow, setProfileToShow] = useState(null)
  const [page, setPage] = useState('home')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [profileFormVisible, setProfileFormVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [profiletext, setProfiletext] = useState('');

  useEffect(() => {
    profileService.getAll().then((profiles) => setProfiles(profiles))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //userService.setToken(user.token);
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      //TODO: need to get profile by user id, not profile id.
      //implement all methods
      
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      console.log(user.id)
      console.log(profileService.getProfile(user.id).then(returnedProfile => { console.log(returnedProfile)}))
      if (!(profileService.getProfile(user.id))) {
        setProfileFormVisible(true)
      }
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

  /*const getProfile = (id) => {
    profileService
      .getProfile(id)
      .then(returnedProfile => {
        setProfileToShow(returnedProfile)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }
  */

  const addProfile = (newProfile) => {
    profileService
      .createProfile(newProfile)
      .then(returnedProfile => {
        setProfiles(profiles.concat(returnedProfile))
        setProfileFormVisible(false)
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

  //TODO: Use routes to move between forms and pages
  //TODO: Success/error notifications

  if (user === null && !profileFormVisible) {
    return (
      <div>
      <Header />
      <div className='container'>
        <div className='card'>
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
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
          </div>
        </div>
      </div>
    )
  } else if (profileFormVisible) {
    return (
      <div>
      <Header />
      <div className='container'>
        <div className='card'>
          <form onSubmit={addProfile}>
            <div>
            nickname
            <input
              type='text'
              value={nickname}
              placeholder={username}
              name='Nickname'
              onChange={({ target }) => setNickname(target.value)}
            />
            </div>
            <div>
              age
              <input
                type='age'
                value={age}
                name='age'
                onChange={({ target }) => setAge(target.value)}
              />
            </div>
            <div>
              profile text
              <input
                type='profiletext'
                value={password}
                name='profiletext'
                onChange={({ target }) => setProfiletext(target.value)}
              />
            </div>
            <button type='submit'>create profile</button>
          </form>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Header />
        <div className="list-wrapper">
          {pageContent()}
          {user.username} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    )
  }


}


export default App