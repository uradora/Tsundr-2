import axios from 'axios'
const baseUrl = 'http://localhost:3001/profiles'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getProfile = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getByUserId = async (user_id) => {
  const response = await axios.get(`${baseUrl}/byuserid/${user_id}`)
  return response.data
}

const createProfile = async (newProfile) => {
  const response = await axios.post(baseUrl, newProfile)
  //response.data.headers['Content-Type']
  return response.data
}

export default { getAll, getProfile, getByUserId, createProfile }