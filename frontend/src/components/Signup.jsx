import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  
  const navigate = useNavigate();
  
  const handleGenderChange = (gender) => {
    setUser({ ...user, gender });
  }
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-space-image.jpg')" }}>
      <div className='w-96 p-6 rounded-xl shadow-lg bg-white/10 backdrop-blur-lg border border-white/20'>
        <h1 className='text-3xl font-bold text-center text-white mb-4'>Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="space-y-3">
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full p-3 rounded-lg bg-white/20 border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400'
              type="text"
              placeholder='Full Name' />
            
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full p-3 rounded-lg bg-white/20 border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400'
              type="text"
              placeholder='Username' />
            
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full p-3 rounded-lg bg-white/20 border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400'
              type="password"
              placeholder='Password' />
            
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full p-3 rounded-lg bg-white/20 border-none text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400'
              type="password"
              placeholder='Confirm Password' />
            
            <div className='flex justify-between my-4'>
              <button type="button" 
                className={`py-2 px-4 rounded-full text-white ${user.gender === 'male' ? 'bg-blue-500' : 'bg-white/20'}`} 
                onClick={() => handleGenderChange("male")}>Male</button>
              <button type="button" 
                className={`py-2 px-4 rounded-full text-white ${user.gender === 'female' ? 'bg-blue-500' : 'bg-white/20'}`} 
                onClick={() => handleGenderChange("female")}>Female</button>
            </div>
          </div>
          
          <p className='text-center text-white my-2'>Already have an account? <Link to="/login" className="underline text-blue-300">Login</Link></p>
          
          <button type='submit' className='w-full py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all'>Signup</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
