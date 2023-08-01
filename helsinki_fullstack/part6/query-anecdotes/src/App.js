import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from 'react-query'
import { getAnecdotes, createNew, voteAnecdote } from './requests'
import { useNotificationDispatch } from './reducers/notificationContext'


const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  // fetch data from server:
  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: false
    }
    )
    
// add anecdote:
//  const getId = () => (100000 * Math.random()).toFixed(0)
  const newAnecdoteMutation = useMutation(createNew, {
      onError: () => {
        dispatch({type: "setNotification", payload: 'Error, anecdotes should be at least 5 char long'})

      },
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
        dispatch({type: "setNotification", payload: `added anecdote ${newAnecdote.content}`})
      }
  })
  
  const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate(content)
      
  }
// vote anecdote:
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
       
      queryClient.setQueryData('anecdotes', anecdotes.filter(n => n.id === newAnecdote.id ? newAnecdote : n))
      dispatch({type: "setNotification", payload: `you voted for ${newAnecdote.content}`})
    }
})

  const handleVote = (anecdote) => {
  console.log('vote')
  voteAnecdoteMutation.mutate(anecdote)
 

}


  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div> Data could not be fetched as server is down.  </div>
  }
  const anecdotes = result.data







 

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
