import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

/////////////////////////////////////////

export const AuthProvider = ( { children } ) => {

    const [user, setUser] = useState(null)

    useEffect( ()=>{
    // const username_string = localStorage.getItem("user_info")
    // const username_js = JSON.parse(username_string)
    const username_js = JSON.parse(localStorage.getItem("user_info"))

    if(username_js) {
      setUser(username_js)
    }
    } , [] )

  return (
    <AuthContext.Provider value={ { user, setUser } }>
        { children }
    </AuthContext.Provider>
  )
}
