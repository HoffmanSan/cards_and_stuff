import { useParams } from "react-router"

export default function UserProfile() {
  const { userId } = useParams()

  return (
    <div>UserProfile of user: {userId}</div>
  )
}