import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error("The useAuthContext hook has to be used inside AuthContextProvider's children components")
  }

  return authContext
}