import React from 'react'
import Link from 'next/link'
const Nav = ({authenticatedState}) => {
  return (
    <ul className="flex">
    <li className="mr-6">
      <a className="text-blue-500 hover:text-blue-800" href="#"></a>
    </li>
    <li className="mr-6">
      <Link href="/dashboard" className="text-blue-500 hover:text-blue-800" >Profile</Link>
    </li>

    { authenticatedState==='not-authenticated'&&(
       <li className="mr-6">
       <Link href="/login" className="text-blue-500 hover:text-blue-800" >Login</Link>
     </li>
    )
   
    }
    <li className="mr-6">
      <a className="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
    </li>
  </ul>
  )
}

export default Nav