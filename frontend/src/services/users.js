import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  //response.data.headers['Content-Type']
  return response.data
}

export default { getAll, getUser, createUser }