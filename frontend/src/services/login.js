import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

const login = async (newProfile) => {
  const response = await axios.post(`${baseUrl}/login`, newProfile)
  return response.data
}

export default { login }
