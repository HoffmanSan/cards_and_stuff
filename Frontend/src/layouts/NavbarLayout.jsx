import { Navbar } from "../components"
import { Outlet } from "react-router"

export default function NavbarLayout() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}