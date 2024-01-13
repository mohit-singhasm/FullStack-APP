import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { useParams } from 'react-router-dom'



const UpdateUserPage = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        isAdmin: ''
    })
    const { token } = useAuth()
    const params = useParams()



    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(user)
    }

    //Getting the User from mongodb

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: { Authorization: token }
            })
            // console.log(response)
            const data = await response.json()
            if (response.ok) {
                setUser((pre) => ({ ...pre, ...data.user }))
            }

        } catch (error) {
            console.log(error)
        }
    }

    // Sending the updated user data to the database

    const updateUser = async(user) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/users/update/${params.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify(user)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User</h1>
                </div>
                {/* user page main  */}
                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="/images/info.png" alt="we are always ready to help" />
                    </div>

                    {/* user form content actual  */}
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={user.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    value={user.phone}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="isAdmin">Admin Status</label>
                                <select
                                    id="isAdmin"
                                    name="isAdmin"
                                    value={user.isAdmin}
                                    onChange={handleInput}>

                                    <option value="false">False</option>
                                    <option value="true">True</option>

                                </select>
                            </div>
                            {/* <div>
                                <label htmlFor="password">New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput}
                                    placeholder='Enter Your New Password'
                                />
                            </div> */}

                            <div>
                                <button type="submit">submit</button>
                            </div>
                        </form>
                    </section>
                </div>

            </section>
        </>
    )
}

export default UpdateUserPage