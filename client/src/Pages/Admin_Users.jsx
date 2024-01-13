import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { Link } from 'react-router-dom'

const Admin_Users = () => {
  const { token } = useAuth()
  const [users, setUsers] = useState([])

  // Getting user data function 

  const getAllUsersData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/users', {
        method: 'GET',
        headers: { Authorization: token }
      })
      const data = await response.json()
      if (response.ok) {
        setUsers(data.allUsers);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
      })
      // console.log(response)
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        getAllUsersData()
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsersData()
  }, [])

  return (
    <>
      <div className="table-container">
        <header className="table-header">
          <div className="column-header">Name</div>
          <div className="column-header">Email</div>
          <div className="column-header">Phone</div>
          <div className="column-header">Update</div>
          <div className="column-header">Delete</div>
        </header>
        <div className="table-body">
          {users.map((user) => {
            const { username, email, phone, _id } = user
            return (<div key={_id} className="table-row">
              <div className="table-cell">{username}</div>
              <div className="table-cell">{email}</div>
              <div className="table-cell">{phone}</div>
              <div className="table-cell"><Link to={`/admin/users/${_id}/edit`} >Edit</Link></div>
              <div className="table-cell"><button onClick={() => { deleteUser(_id) }}>Delete</button></div>
            </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default Admin_Users