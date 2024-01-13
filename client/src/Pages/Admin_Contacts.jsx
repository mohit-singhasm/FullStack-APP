import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'

const Admin_Contacts = () => {
  const { token } = useAuth()
  // console.log(token)
  const [contacts, setContacts] = useState([])

  // Getting all users

  const getAllContactData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/contacts', {
        method: 'GET',
        headers: { Authorization: token }
      })
      const data = await response.json()
      if (response.ok) {
        setContacts(data.allContacts);
        // console.log(data.allContacts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // deleting the users of given id
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
      })
      // console.log(response)
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        getAllContactData()
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllContactData()
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
          {contacts.map((contact) => {
            const { username, email, message, _id } = contact
            return (<div key={_id} className="table-row">
              <div className="table-cell">{username}</div>
              <div className="table-cell">{email}</div>
              <div className="table-cell">{message}</div>
              {/* <div className="table-cell">edit</div> */}
              <div className="table-cell"><button onClick={() => { deleteUser(_id) }}>Delete</button></div>
            </div>)
          })}
        </div>
      </div>
    </>)
}

export default Admin_Contacts