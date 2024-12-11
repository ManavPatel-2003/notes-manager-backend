import React, { useState } from 'react'
// import Navbar from '../../components/Navbar'
import { Link, Navigate, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import Navbar from '../components/Navbar'
import { Spinner } from "@material-tailwind/react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

function Login() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    
    const handleLogin = async(e) => {
        // console.log(email)
        // console.log(password)
        setLoading(true);
        e.preventDefault();

        try{
            const res = await api.post("/api/token/", {username, password})
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigate("/")
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
      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"> */}
      <Navbar />
      <div className='container mx-auto my-auto'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
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
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
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
            </div>

            <div>
            {
              !loading?
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                value="Sign In"
              >Sign In</button>
              :
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 bg-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                value="Sign In"
              >
              <Spinner color="blue" /></button>
              
            }
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not Registered?{' '}
            {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> */}
              {/* changed login path from /login to /*/}
              <Link to='/register'>
              Register
              </Link>
            {/* </a> */}
          </p>
          
          {error}
        </div>
      </div>
    
    </div>
  )
}

export default Login