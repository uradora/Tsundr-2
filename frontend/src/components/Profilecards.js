import React from 'react'
import Profilecard from './Profilecard'
import './../styles/profilecards.css'

const Profilecards = ({profiles}) => {

  return (
    <div className="cards">
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

export default Profilecards