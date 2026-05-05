import { createContext, useState, useContext } from "react";
import { getSessionProfile } from "../api/getSession";
import { useEffect } from "react";

const AuthContext = createContext()

export function AuthProvider({ children, initialUser }) {
  const [user, setUser] = useState(initialUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function LoadUser()
    {
      try {
        const data = await getSessionProfile()
        setUser(data)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    LoadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}