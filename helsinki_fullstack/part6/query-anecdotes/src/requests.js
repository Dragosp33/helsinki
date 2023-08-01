
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (content) => {
    const getId = () => (100000 * Math.random()).toFixed(0)
    const object = { content, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export const voteAnecdote = async (anecdote) => {
    const object = {...anecdote, votes: anecdote.votes+1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, object)
    return response.data
}