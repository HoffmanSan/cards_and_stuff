import axios from 'axios'

export const login = async (username, password) => {
  const response = await axios.post('/api/auth/login', {
    username,
    password
  })
  return response.data
}

export const register = async (username, password, email) => {
  const response = await axios.post('/api/auth/register', {
    username,
    password,
    email
  })
  return response.data
}

export const logout = async () => {
  await axios.post('/api/auth/logout')
}