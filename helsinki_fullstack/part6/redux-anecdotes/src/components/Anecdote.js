import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdotesReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      {anecdote.content} 
      <p> {anecdote.votes}</p><button onClick={handleClick}> vote </button>
    </li>
  )
}



const Anecdotes = () => {
  const dispatch = useDispatch()

  const VoteAnecdote = async (id, content) => {
    const oldObject = anecdotes.find(n => n.id === id)
    const newObject = {...oldObject, votes: oldObject.votes + 1}
    dispatch(voteForAnecdote(id, newObject))
    console.log(content)
   // console.log(vote)
   // console.log(changeNotification)
    dispatch(setNotification(content, 10))
  }

  const anecdotes = useSelector(state => { 
    let k = state.anecdotes
    if (state.filter !== 'ALL'){
    console.log(state.filter)
    k = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    console.log(k)
  }
    const m = [...k]
    console.log(k)
    console.log("m sort", m.sort((a, b) => b.votes - a.votes))
    return m
  })
    //state.anecdotes.sort((a, b) => b.votes - a.votes ) })

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            VoteAnecdote(anecdote.id, anecdote.content)
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes