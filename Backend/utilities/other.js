export function generateRoomId (type, ...userIds) {
  const roomId = `${type}:${[...userIds].sort().join("_")}`
  return roomId
}