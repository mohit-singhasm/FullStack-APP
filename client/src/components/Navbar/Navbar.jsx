import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../../store/auth'

const Navbar = () => {

    const { isLoggedIn, user } = useAuth()

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">Mohit Singh</NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/services">Services</NavLink></li>
                            {user.isAdmin && <li><NavLink to="/admin">Admin</NavLink></li>}
                            {isLoggedIn ? <li><NavLink to="/logout">Logout</NavLink></li> : <><li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Sign Up</NavLink></li></>}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar