import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FaHome, FaUserTie } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { GrBusinessService } from "react-icons/gr";
import { useAuth } from '../../store/auth';

const Admin_Layout = () => {
  const { user, isLoading } = useAuth()

  console.log(isLoading)
  if(isLoading) {
    return (
      <h1>Loading......</h1>
    )
  }

  if (!user.isAdmin) {
   return <Navigate to='/' />
  }


  return (
    <>
      <header className='admin-header'>
        <div className="container">
          <nav>
            <ul>
              <li>
                <FaUserTie />
                <NavLink to='/admin/users'>User</NavLink>
              </li>
              <li>
                <MdContactMail />
                <NavLink to='/admin/contacts'>Contacts</NavLink>
              </li>
              <li>
                <GrBusinessService />
                <NavLink to='/services'>Services</NavLink>
              </li>
              <li>
                <FaHome />
                <NavLink to='/'>Home</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Admin_Layout