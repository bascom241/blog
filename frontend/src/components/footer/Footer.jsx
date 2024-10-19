import React, { useContext } from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'
const Footer = () => {
  const {token} = useContext(BlogContext)
  return (
    <div className='footer-container'>
     <ul className='footer-cat'>
      <NavLink to={token? 'createPost':'register'}>Lets</NavLink>
      <NavLink to={token? 'createPost':'register'}>Get</NavLink>
      <NavLink to={token? 'createPost':'register'}>Started</NavLink>
      <NavLink to={token? 'createPost':'register'}>Now!!</NavLink>
 
     </ul>
    </div>
  )
}

export default Footer
