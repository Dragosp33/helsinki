import { useDispatch } from 'react-redux'
import { postAnecdote } from '../reducers/anecdotesReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()


  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(postAnecdote(content))
    dispatch(setNotification(content, 10))
  }

  return (
    <>
    <h2> Add a new anecdote: </h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
    </>
  )

}

export default AnecdoteForm