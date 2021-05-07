import React from 'react'
import Profilecard from './Profilecard'
import './../styles/profilecards.css'

const Profilecards = ({profiles}) => {

  return (
    <div className="container">
      <div className="list">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <Profilecard
                key={profile.id}
                username={profile.username}
                age={profile.age}
                profiletext={profile.profiletext}
                //handleSeeProfile={props.handleSeeProfile}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>No users to show...</td>
            </tr>
          )
        }
      </div>
    </div>
  )
}

export default Profilecards