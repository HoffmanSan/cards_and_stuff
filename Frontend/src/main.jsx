import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'

// Pages
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx' // TODO: zmienić loading tej strony ze statycznego na lazy
import UserProfile from './pages/UserProfile.jsx' // TODO: zmienić loading tej strony ze statycznego na lazy
import Lobby from './pages/Lobby.jsx' // TODO: zmienić loading tej strony ze statycznego na lazy

// Components

// Layouts
import NavbarLayout from './layouts/NavbarLayout.jsx'

// Contexts
import { AuthContextProvider } from "./contexts/AuthContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Dashboard />}/>

          <Route element={<NavbarLayout />} >
            <Route path='home' element={<Home />}/>
            <Route path='profile/:userId' element={<UserProfile />}/>
            <Route path='lobby' element={<Lobby />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
