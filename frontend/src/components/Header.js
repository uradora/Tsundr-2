import React from 'react'
import './../styles/header.css'
import PersonIcon from '@material-ui/icons/Person'
import ForumIcon from '@material-ui/icons/Forum'
import IconButton from '@material-ui/core/IconButton'

const Header = () => {
  return (
    <div className='header'>
      <IconButton>
        <PersonIcon className='headericon' fontSize='medium' />
      </IconButton>
      <h2>OwO</h2>
      <IconButton>
        <ForumIcon className='headericon' fontSize='medium' />
      </IconButton>
    </div>
  )
}

export default Header