import React, { useState } from 'react'
// import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import Navbar from '../components/Navbar'
import { Spinner } from '@material-tailwind/react'
// import axiosInstance from '../../utils/axiosInstance'


function Register() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async(e) => {

        if(password != confirmPassword){
          alert("Passwords do not match!")
          navigate('/register')
        }
        setLoading(true);
        e.preventDefault();

        try{
            // console.log(username)
            // console.log(password)
            const res = await api.post("/api/user/register/", {username, password})
            navigate("/login")
        }
        catch(error){
            setError(error)
            // alert(error)
        }
        finally{
            setLoading(false)
        }
        
    }

    
  return (
    <div>
      <Navbar />
      <div className='container mx-auto my-auto'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method = "post" onSubmit={handleRegister} className="space-y-6">
            {/* <div> */}
              {/* <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div> */}
            {/* </div> */}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e) => setUserName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            {
              !loading?
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Register</button>
              :
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 bg-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              <Spinner color="blue" /></button>
              
            }
              {/* {error} */}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Registered?{' '}
            {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> */}
              {/* changed login path from /login to /*/}
              <Link to='/login'>
              Sign in
              </Link>
            {/* </a> */}
          </p>
        </div>
      </div>
    
    </div>
  )
}

export default Register