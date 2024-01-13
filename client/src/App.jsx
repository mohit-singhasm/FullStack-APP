import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PageNotFound from './Pages/PageNotFound'
import Navbar from './components/Navbar/Navbar'
import Services from './Pages/Services'
import Footer from './components/Footer/Footer'
import Logout from './Pages/Logout'
import Admin_Layout from './components/Layouts/Admin_Layout'
import Admin_Contact from './Pages/Admin_Contacts'
import Admin_User from './Pages/Admin_Users'
import UpdateUserPage from './Pages/UpdateUserPage'


function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/services' element={<Services />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/admin' element={<Admin_Layout />}>
            <Route path='users' element={<Admin_User />} />
            <Route path='contacts' element={<Admin_Contact />} />
            <Route path='users/:id/edit' element={<UpdateUserPage />}  />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
