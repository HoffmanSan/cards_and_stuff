import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext.js"

export default function Home() {
  const { socket, login, register } = useAuthContext()
  const username = "Hoffman"
  const password = "123"
  const email = "test@gmail.com"
  const macioId = "2137"
  const bacioId = "42069"

  const joinPrivateChat = (userOneId, userTwoId) => {
    socket.emit('joinPrivateChat', {userOneId, userTwoId})
  }

  const sendPrivateMessage = (from, to, message) => {
    socket.emit('privateMessage', {from, to, message})
  }

  useEffect(() => {
    const handleMessage = ({from, message}) => {
      console.log("Masz wiadomość od ", from, " która brzmi: ", message)
    }

    if (socket) {
      socket.on('privateMessage', handleMessage)
    }
    return () => {
      socket.off('privateMessage', handleMessage)
    }
  }, [socket])
  
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => login(username, password)}>Login</button>
      <button onClick={() => register(username, password, email)}>Register</button>
      <button onClick={() => joinPrivateChat(macioId, bacioId)}>Join ChatRoom with Bacio</button>
      <button onClick={() => joinPrivateChat(bacioId, macioId)}>Join ChatRoom with Macio</button>
      <button onClick={() => sendPrivateMessage(macioId, bacioId, "Siemano od Macia")}>Send private message as Macio</button>
      <button onClick={() => sendPrivateMessage(bacioId, macioId, "Siemano od Bacia")}>Send private message as Bacio</button>
    </div>
  )
}