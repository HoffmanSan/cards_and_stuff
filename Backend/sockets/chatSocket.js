import { generateRoomId } from "../utilities/other.js"

export default function chatSocket(socket, io) {
  console.log('New chat socket connection. Socket ID: ', socket.id)
  
  socket.on('joinPrivateChat', ({ userOneId, userTwoId }) => {
    const privateRoomId = generateRoomId("private", userOneId, userTwoId)
    socket.join(privateRoomId)
    console.log("User joined private chat room: ", privateRoomId)
  })

  socket.on('privateMessage', ({from, to, message}) => {
    const privateRoomId = generateRoomId("private", from, to)
    console.log("User: ", from, " has sent a message to ", to, ". The message is: ", message)
    io.to(privateRoomId).emit('privateMessage', {from, message})
  })
}