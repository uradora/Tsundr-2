import axios from 'axios'
const baseUrl = 'http://localhost:3001/profiles'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then((response) => response.data)
}

const getProfile = async (id) => {
  const config = {
    body: { "id": id }
  }
  const response = await axios.get(`${baseUrl}/one`, config)
  return response.data
}

const createProfile = async (username, age, profiletext) => {
  const response = await axios.post(`${baseUrl}/create`, newProfile)
  response.data.headers['Content-Type']
  return response.data
}

export default { getAll, getProfile, createProfile }