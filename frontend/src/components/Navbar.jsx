import React, { useEffect, useState } from 'react'
import ProtectedRoute from "./ProtectedRoute.jsx"
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn.jsx';



function Navbar() {
  const navigate = useNavigate();

  const Logout = () => {
    navigate('/logout')
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>NotesManager</h2>
        {/* <h2 className='text-xl font-medium text-black py-2'>NotesManager</h2> */}
        <LogoutBtn onLogout = {Logout}/>
    </div>
  )
}

export default Navbar