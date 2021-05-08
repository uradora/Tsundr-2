import React from 'react';
import './../styles/profilecard.css'

const Profilecard = (props) => {

  return (
    <div className='card'>
    
      {props.nickname}
      <br />
      {props.age}
      <br />
      {props.profiletext}
      <button
        className="btn">
        See profile
      </button>
  </div>
  )
}

export default Profilecard 