const Form = ({addNumber, newName, handlePersonChange, newNumber, handleNumberChange}) => {
    return (
    <form onSubmit={addNumber}>

    <div>
      name: <input value={newName}
      onChange={handlePersonChange} />

    </div>
    <div>number: <input value={newNumber} onChange = {handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    )

}
export default Form