import React, { useState, useEffect } from 'react'
import profileService from './services/profiles'
import userService from './services/users'
import loginService from './services/login'
import Profilecards from './components/Profilecards'
import Header from './components/Header'
import { TextField, Button } from '@material-ui/core/'
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

  const createUser = () => {

    const newUser = {
      'username': username,
      'password': password
    }
    
    userService
      .createUser(newUser)
      .then(returnedUser => {
        handleLogin()
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })

  }

  const handleLogin = async (event) => {
    event.preventDefault()

    //TODO: fix login, also it should proably take id, not username
    //create registration form

    try {
      const user = await loginService.login({
        username,
        password
      })
      
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')

      profileService.getByUserId(user.id)
        .then(returnedProfile => {
          if (returnedProfile.length <= 0) {
            setProfileFormVisible(true)
          }
        })

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

  const addProfile = () => {

    const newProfile = {
      'nickname': nickname,
      'age': age,
      'profiletext': profiletext,
      'user_id': user.id
    }
    
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
          <form noValidate autoComplete="off" onSubmit={handleLogin}>
            <div>
            <TextField id="standard-basic" label="Käyttäjänimi" type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}>
            </TextField>
            </div>
            <div>
            <TextField id="standard-basic" label="Salasana" type='password'
                value={password}
                name='password'
                onChange={({ target }) => setPassword(target.value)}>
            </TextField>
            </div>
            <Button variant='outlined' color='default' type='submit'>
              Kirjaudu sisään
            </Button>
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
            nimimerkki
            <input
              type='text'
              value={nickname}
              placeholder={username}
              name='Nickname'
              onChange={({ target }) => setNickname(target.value)}
            />
            </div>
            <div>
            ikä
            <input
              type='text'
              value={age}
              name='age'
              onChange={({ target }) => setAge(target.value)}
            />
            </div>
            <div>
            profiiliteksti
            <input
              type='text'
              value={profiletext}
              name='profiletext'
              onChange={({ target }) => setProfiletext(target.value)}
            />
            </div>
            <button type='submit'>luo profiili</button>
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