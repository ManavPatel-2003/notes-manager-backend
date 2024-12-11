import React from 'react'

function LogoutBtn({onLogout}) {
  return (
      <button className='text-xl font-medium text-black py-2' onClick={() => onLogout()}>Logout</button>
  )
}

export default LogoutBtn
