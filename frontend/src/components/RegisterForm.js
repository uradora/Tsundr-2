import React from 'react'
import { TextField, Button } from '@material-ui/core/'
import './../styles/app.css'

const RegisterForm = ({
  handleRegister,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <div>
        <form noValidate autoComplete='off' onSubmit={handleRegister}>
          <div>
          <TextField id='standard-basic' label='Käyttäjänimi' type='text'
              value={username}
              name='username'
              onChange={handleUsernameChange}>
          </TextField>
          </div>
          <div>
          <TextField id='standard-basic' label='Salasana' type='password'
              value={password}
              name='password'
              onChange={handlePasswordChange}>
          </TextField>
          </div>
          <Button variant='outlined' color='default' type='submit'>
            Rekisteröidy
          </Button>
        </form>
        </div>
  )
}

export default RegisterForm