import axios from 'axios'

export const fetchObjects = async () => {
  const { data } = await axios.get(
    'http://localhost:3001/objects'
  )

  return data
}