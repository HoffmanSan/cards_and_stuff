import chatSocket from "../sockets/chatSocket.js"

export default function socketHandler (io) {
  io.on('connection', (socket) => {
    console.log("New user connected via socket. Socket ID: ", socket.id)

    chatSocket(socket, io)

     socket.on('disconnect', () => {
      console.log('User disconnected from socket:', socket.id);
    })
  })
}