import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'

export default function ChatWindow () {
  const { socket, user } = useAuthContext();
  const [messages, setMessages] = useState([{from: 'Empty', content: 'Empty'}])
  const [message, setMessage] = useState('')
  const [sender, setSender] = useState('From')
  const [receiver, setReceiver] = useState('To')

  const joinRoom = (from, to) => {
    console.log(from, to)
    socket.emit('joinPrivateChat', {from: from, to: to})
  }

  const sendMessage = (from, to, message) => {
    try {
      if (message) {
        socket.emit('privateMessage', {from, to, message})
        setMessages(prev => [...prev, {from: sender, content: message}])
        setMessage('')
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const handleMessage = ({from, message}) => {
      setMessages(prev => [...prev, {from, content: message}])
    }
    if (socket) {
      socket.on('privateMessage', handleMessage)
    }
    

    return () => {
      if (socket) {
        socket.off('privateMessage', handleMessage)
      }
    }
  }, [socket])

  return (
    <div>
      <input type="text" value={sender} onChange={(e) => setSender(e.target.value)}/>
      <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)}/>
      <button onClick={() => joinRoom(sender, receiver)}>Join Conversation</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{`${msg.from}: ${msg.content}`}</li>
        ))}
      </ul>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={() => sendMessage(sender, receiver, message)}>Send</button>
    </div>
  )
}
