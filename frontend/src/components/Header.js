import React from 'react'
import './../styles/header.css'
import { MdPerson } from "react-icons/md"
import { MdMessage } from "react-icons/md"
import { MdHome } from "react-icons/md"

const Header = () => {
  return (
    <div className='header'>
      <MdPerson className='headericon' />
      <MdHome className='headericon' />
      <MdMessage className='headericon'/>
    </div>
  )
}

export default Header