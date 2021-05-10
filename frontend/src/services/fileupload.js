import axios from 'axios'
const baseUrl = 'http://localhost:3001/images'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const fileUpload = async (file) => {
  const formData = new FormData()

  formData.append('file', file)

  const response = await axios.post(`${baseUrl}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export default { getAll, fileUpload }