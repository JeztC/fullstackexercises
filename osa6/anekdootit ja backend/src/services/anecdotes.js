import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getAnecdote = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const createNew = async content => {
    const response = await axios.post(baseUrl, asObject(content))
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export default { getAll, createNew, update, getAnecdote }