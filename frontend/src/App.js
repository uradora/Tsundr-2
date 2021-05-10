import React, { useState, useEffect } from 'react'
import profileService from './services/profiles'
import userService from './services/users'
import loginService from './services/login'
import Header from './components/Header'
import Profilecards from './components/Profilecards'
import LoginForm from './components/LoginForm'
import ProfileForm from './components/ProfileForm'
import './styles/header.css'
import './styles/app.css'

const App = () => {
  const [profiles, setProfiles] = useState([])
  const [profileFormVisible, setProfileFormVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [nickname, setNickname] = useState('')
  const [age, setAge] = useState('')
  const [profiletext, setProfiletext] = useState('')

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

  const handleSubmitProfile = () => {

    const newProfile = {
      'nickname': nickname,
      'age': age,
      'profiletext': profiletext,
      'user_id': user.id
    }
    
    profileService
      .createProfile(newProfile)
      .then(returnedProfile => {
        handleFileUpload()
        setProfiles(profiles.concat(returnedProfile))
        setProfileFormVisible(false)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  } 

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInUser');
  }
  
  if (user === null && !profileFormVisible) {
    return (
    <div>
      <Header />
        <div className='container'>
          <div className='card'>
            <LoginForm 
              handleLogin={handleLogin}
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            /> 
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
              <ProfileForm 
                handleSubmit={handleSubmitProfile}
                nickname={nickname}
                age={age}
                profiletext={profiletext}
                handleNicknameChange={({ target }) => setNickname(target.value)}
                handleAgeChange={({ target }) => setAge(target.value)}
                handleProfiletextChange={({ target }) => setProfiletext(target.value)}
              />
           </div>
          </div>
        </div>
    )
  } else {
    return (
        <div className="list-wrapper">
          <Profilecards profiles={profiles} />
          {user.username} kirjautunut
          <br />
          <button onClick={handleLogout}>kirjaudu ulos</button>
        </div>
    )
  }
}

export default App