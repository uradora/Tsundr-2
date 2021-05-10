import React from 'react'
import { TextField, Button } from '@material-ui/core/'
import './../styles/app.css'

const ProfileForm = ({
  handleSubmit,
  handleNicknameChange,
  handleAgeChange,
  handleProfiletextChange,
  nickname,
  age,
  profiletext
}) => {
  return (
    <div>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <div>
          <TextField id='standard-basic' label='Nimimerkki' type='text'
              value={nickname}
              name='nickname'
              onChange={handleNicknameChange}>
          </TextField>
          </div>
          <div>
          <TextField id='standard-basic' label='Ikä' type='text'
              value={age}
              name='age'
              onChange={handleAgeChange}>
          </TextField>
          </div>
          <div>
          <TextField id='standard-basic' label='Profiiliteksti' type='text'
              value={profiletext}
              name='profiletext'
              onChange={handleProfiletextChange}>
          </TextField>
          </div>
          <Button variant='outlined' color='default' type='submit'>
            Luo profiili
          </Button>
        </form>
        </div>
  )
}

export default ProfileForm