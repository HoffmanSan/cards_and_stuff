import { generateRoomId } from "../utilities/other.js"

export default function chatSocket(socket) {
  
  socket.on('joinPrivateChat', ({ from, to }) => {
    const privateRoomId = generateRoomId("private", from, to)
    socket.join(privateRoomId)
  })

  socket.on('privateMessage', ({from, to, message}) => {
    const privateRoomId = generateRoomId("private", from, to)
    socket.broadcast.to(privateRoomId).emit('privateMessage', {from, message})
  })
}