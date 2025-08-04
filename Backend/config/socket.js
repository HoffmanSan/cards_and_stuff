import chatSocket from "../sockets/chatSocket.js"

export default function socketHandler (io) {
  io.on('connection', (socket) => {

    chatSocket(socket, io)

    socket.on('disconnect', () => {

    })
  })
}