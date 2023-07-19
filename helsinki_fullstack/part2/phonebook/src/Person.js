const Person = ({person, onClick}) => {

    return (
        <li>{person.name} {person.number} <button  onClick={onClick}> Delete this </button></li> 
    )
  
  
  }

export default Person