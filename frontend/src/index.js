import React, { useState, useEffect } from 'react'
import profileService from './services/profiles'
import ReactDOM from 'react-dom'
import Profilecard from './components/Profilecard'


const App = () => {
  const [profiles, setProfiles] = useState([])
  const [profileToShow, setProfileToShow] = useState(null)

  useEffect(() => {
    profileService.getAll().then((profiles) => setProfiles(profiles))
  }, [])

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

  return (
    <div className="App">
      {profiles.map((profile) => (
        <Profilecard
          key={profile.id}
          username={profile.username}
          age={profile.age}
          profiletext={profile.profiletext}
        />
      ))}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))