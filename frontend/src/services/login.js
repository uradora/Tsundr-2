import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

const login = async (username, password) => {
  const user = {
    'username': username,
    'password': password
  }
  const response = await axios.post(`${baseUrl}/`, user)
  return response.data
}

export default { login }
