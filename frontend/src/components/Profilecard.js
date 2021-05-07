import React, { useState } from 'react'
import profileService from './../services/profiles'

const Profilecard = ({username, age, profiletext}) => {

  const profileStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 5,
    width: "fit-content",
  }

  return (
    <div style={profileStyle}>
      <div>
        {username} 
        <br />
        {age}
        <br />
        {profiletext}
        <br />
        <button>Go to profile</button>
      </div>
    </div>
  )
}

export default Profilecard 