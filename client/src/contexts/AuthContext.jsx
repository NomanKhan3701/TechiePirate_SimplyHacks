import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()
const admin_server_url = process.env.REACT_APP_server_url;

export function AuthProvider({children}) {
  const [state, setState] = useState({
    authenticated: false,
    user: null,
    token: localStorage.getItem('auth_token')
  })

  const verifyLogin = async () => {
    if (localStorage.getItem('auth_token')) {
      try {
        const { data: res } = await axios.get(
          `${admin_server_url}/api/auth/`,
          {
            headers: {
              'Authorization': localStorage.getItem('auth_token')
            }
          }
        )
  
        updateState({
          authenticated: true,
          token: localStorage.getItem('auth_token'),
          user: res
        })
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem('auth_token')
        }
      }
    }
  }

  useEffect(() => {
    verifyLogin()
  }, [])

  const updateState = (updates) => {
    const data = {}
    Object.assign(data, state)
    Object.assign(data, updates)
    setState(data)
  }

  const value = { state: state, setState, updateState, verifyLogin }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}