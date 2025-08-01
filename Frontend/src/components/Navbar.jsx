import { NavLink } from "react-router"
import './navbar.css'

const USERID = '2137'; // TODO: wyciągnąc userId z localstorage / cookies

export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li><NavLink to="lobby">PLAY</NavLink></li>
          <li><NavLink to="home">Home</NavLink></li>
          <li><NavLink to={`profile/${USERID}`}>Profile</NavLink></li>
        </ul>
      </nav>
    </>
  )
}