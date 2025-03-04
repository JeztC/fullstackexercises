import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { getAll }