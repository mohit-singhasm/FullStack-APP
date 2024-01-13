import { createContext, useContext, useState, useEffect } from 'react'

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState({})
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const storeTokenInLs = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken)
    }

    let isLoggedIn = !!token;

    const logoutUser = () => {
        setToken('')
        setUser('')
        return localStorage.removeItem("token")
    }

    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:3000/api/auth/user", {
                method: 'GET',
                headers: { Authorization: token }
            })
            if (response.ok) {
                let data = await response.json()
                // console.log(data.userData)
                setUser(data.userData)
                setIsLoading(false)
            }else{
                console.log('not user data is found')
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error, 'auth')
        }
    }

    const getServices = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data/service', {
                method: "GET",
            })

            if (response.ok) {
                const data = await response.json();
                // console.log(data)
                setServices(data.servicesAll)
            } else {
                console.log("no data found")
            }

        } catch (error) {
            console.log(error, 'auth')
        }
    }

    // useEffect(() => {
    //     getServices()
    //     getData()

    // }, [])
    useEffect(() => {
        getServices()
        if (isLoggedIn) {
            getData()
        }

    }, [isLoggedIn])


    return (
        <authContext.Provider value={{ storeTokenInLs, logoutUser, isLoggedIn, user, services, token, isLoading }}>
            {children}
        </authContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(authContext);
}



