import {useState, useEffect, createContext, useContext} from "react";
import {NotificationManager} from "react-notifications"
import { UserApi } from "../client/backend-api/admin"

const UserContext = createContext({
    user : null,
    loginUser: () => {},
})

const useUser = () => useContext(UserContext)

const UserProvider = ( {children} ) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        UserApi.getProfile().then((user, error) => {
            if (error) {
                console.error(error)
            } else {
                console.log(user);
                setUser(user)
            }
        }).catch(console.error)
    }, [])

    const loginUser = async (username, password) => {
        // const {user, error} = 
        await UserApi.login(username, password).then(r =>{
            NotificationManager.success("Logged in successfully!")
            setUser(r.data)
        }).catch(error =>{
            NotificationManager.error(error)
        })
            
        // if (error) {
        //     NotificationManager.error(error)
        // } else {
        //     NotificationManager.success("Logged in successfully!")
        //     console.log(user);
        //     setUser(user)
        // }
    }

    const logoutUser = async () => {
        setUser(null)
        await UserApi.logout()
    }

    return (
        <UserContext.Provider value={{user, loginUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {useUser, UserProvider}
