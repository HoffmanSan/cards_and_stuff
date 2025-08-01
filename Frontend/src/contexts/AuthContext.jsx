import { createContext, useState, useEffect } from "react"
import io from 'socket.io-client'
import * as auth from "../api/auth/auth.js";

export const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      setUser(null)
    };
  }, [socket]);

  const login = async (username, password) => {
    try {
      setIsLoading(true)

      const user = await auth.login(username, password)
      setUser(user)

      const socket = io()

      socket.on("connect", () => {
        console.log("Connecting via socket succeeded")
        setSocket(socket)
      })
      
      socket.on("connect_error", (err) => {
        console.error("Connecting via socket failed")
        setSocket(null)
        setUser(null)
        setError(err)
      })
    }
    catch (error) {
      setError(error)
      setUser(null)
      setSocket(null)
      console.error("An error has occurred during login process: ", error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const register = async (username, password, email) => {
    try {
      setIsLoading(true)

      await auth.register(username, password, email)
      await login(username, password)
    }
    catch (error) {
      setError(error)
      setUser(null)
      setSocket(null)
      console.error("An error has occurred during registration process: ", error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)

      await auth.logout()
      setUser(null)

      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
    }
    catch (error) {
      setError(error)
      console.error("An error has occurred during logout process: ", error)
    }
    finally {
      setIsLoading(false)
      setUser(null);

      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, socket, error, isLoading, login, register, logout }} >
      {children}
    </AuthContext.Provider>
  )
}