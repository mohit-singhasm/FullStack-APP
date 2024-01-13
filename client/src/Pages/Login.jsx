import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import errorMsg from '../components/error.js'
import { toast } from 'react-toastify'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const { storeTokenInLs } = useAuth()

  // lets tackle our handleInput
  const handleInput = (e) => {
    let name = e.target.name
    let value = e.target.value

    setUser(pre => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  // handle fomr getFormSubmissionInfo`
  const handleSubmit = (e) => {
    e.preventDefault();
    getData()
  }

  const getData = async () => {
    // try {
    //   const response = await Axios.post('http://localhost:3000/api/auth/register', user).then((res)=> {
    //   console.log(res)
    // })
    // console.log(response)
    // } catch (error) {
    //   console.log(error)
    // }

    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user)
        }
      )
      console.log(response);
      const res_data = await response.json();
      console.log(res_data)

      if (response.ok) {
        console.log(errorMsg(res_data))
        toast.success(res_data.message)
        storeTokenInLs(res_data.token)
        setUser({
          email: '',
          password: '',
        })
        navigate('/')
      } else {
        console.log(errorMsg(res_data))
        toast.error(res_data[errorMsg(res_data)])
      }

    } catch (error) {
      console.log('register', error)
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="login img"
                  width='500'
                  height='500'
                />
              </div>

              {/* let tackle register form */}

              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name='email'
                      placeholder='email'
                      id='email'
                      required
                      autoComplete='off'
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name='password'
                      placeholder='password'
                      id='password'
                      required
                      autoComplete='off'
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type='submit' className='btn btn-submit'>Login</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login