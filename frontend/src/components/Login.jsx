import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" 
         style={{ backgroundImage: "url('/path-to-your-space-background.jpg')" }}>
      <div className='w-full max-w-md p-8 rounded-2xl shadow-lg bg-white bg-opacity-10 backdrop-blur-md border border-gray-300'>
        <h1 className='text-3xl font-bold text-center text-white'>Login</h1>
        <form onSubmit={onSubmitHandler} className="mt-6">
          <div>
            <label className='block text-sm font-semibold text-gray-200'>Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full mt-1 p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              type="text"
              placeholder='Enter your username'
            />
          </div>
          <div className="mt-4">
            <label className='block text-sm font-semibold text-gray-200'>Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full mt-1 p-3 bg-transparent border border-gray-300 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              type="password"
              placeholder='Enter your password'
            />
          </div>

          <div className="text-center mt-4">
            <button type="submit" 
                    className='w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition'>
              Login
            </button>
          </div>

          <p className='text-center text-gray-300 mt-4'>
            Don't have an account? 
            <Link to="/signup" className="text-blue-400 hover:underline ml-1">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;
