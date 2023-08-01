
const AnecdoteForm = ({addAnecdote}) => {
  



  //dispatch({type: "setNotification", payload: `you voted for ${anecdote.content}`})

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
