import { useState } from "react"
import { NavLink } from "react-router"
import { useAuthContext } from "../hooks/useAuthContext.js"

export default function Dashboard() {
  const { login } = useAuthContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
    <div>Dashboard</div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={() => login(username, password)}>Login</button>
      <NavLink to="/home">Go to Home</NavLink>
    </>
  )
}