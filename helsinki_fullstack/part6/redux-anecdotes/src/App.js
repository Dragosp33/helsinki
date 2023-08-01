import Anecdotes from "./components/Anecdote"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from "./reducers/anecdotesReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification/>
      <h2> Anecdotes: </h2>
      <Filter/>
      <Anecdotes/>
      <AnecdoteForm/>
      
    </div>
  )
}

export default App