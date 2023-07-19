import { useState, useEffect } from 'react'


import Person from './Person'
import Filter from './Filter'
import Form from './Form'
import Persons from './services/Persons'
import Notification from './Notification'




const App = () => {


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [messageType, setMessageType] = useState('notification');




  useEffect(() => {
    console.log('effect')
    Persons.getAll().then(initialPersons => {
      console.log("pers initiale:" , initialPersons)
      setPersons(initialPersons)
      }).catch(error => {
        console.log("eroare: ", error);
      })
  }, [])
  
  console.log('render', persons.length, 'persons')



// function to submit the form

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
  }
  if (containsName(personObject.name)){
    const persoana = persons.find(n => n.name.toLowerCase() === personObject.name.toLowerCase());
    console.log(`persoana: ${persoana.id} - ${persoana.name}, si obiectnou: ${personObject.number}`)
    const changedPersoana = {...persoana, number:newNumber};
    console.log(changedPersoana.name, changedPersoana.number, changedPersoana.id);
    Persons
    .update(changedPersoana.id, changedPersoana)
    .then(returnedPerson => {
      console.log(`update persoana: ${returnedPerson.number}`);
      setPersons(persons.map(n => n.id !== changedPersoana.id ? n : returnedPerson)) 
      setMessage(`updated person ${returnedPerson.name}`)
      setMessageType('notification');
      setNewName('')
      setNewNumber('')
      setNotificationVisible(true);

      // After adding data, you can decide when to hide the notification
      // For example, you can hide it after a certain time or after a specific event occurs
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    
    })
    .catch(() => {
      changeNotification('error', `Person ${persoana.name} has been already deleted from the server.`)
      setPersons(persons.filter(n => n.id !== changedPersoana.id))
    })




  }
  else {
  Persons
    .create(personObject)
    .then(returnedPerson => {
      console.log(`creare persoana: ${returnedPerson}`);

      setPersons(persons.concat(returnedPerson))
      setMessage(`A fost adaugata persoana ${returnedPerson.name}`)
      setMessageType('notification');
      setNewName('')
      setNewNumber('')
      setNotificationVisible(true);

      // After adding data, you can decide when to hide the notification
      // For example, you can hide it after a certain time or after a specific event occurs
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    


    })
    .catch(() => {
      setMessageType('error');
      alert(
        `the Person '${personObject.name}' could not be added on server`
      )
     
    })
  }
}

  const changeNotification = (type, message) => {
    console.log(type, message)
    setMessage(message);
    setMessageType(type);
    setNotificationVisible(true);

      // After adding data, you can decide when to hide the notification
      // For example, you can hide it after a certain time or after a specific event occurs
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);

  }

// function to handle input change
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
//function to check if name exists:
  const containsName = (name) => {
    return (persons.filter(e => e.name.toLowerCase() === name.toLowerCase()).length > 0 ? true : false)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value);

  }

  const deleteNumber = (id) => {
    const person = persons.find(n => n.id === id)
    console.log(`A ajuns la stergerea idului ${id}, adica persoana ${person}`)
   
    if (window.confirm(`Do you really want to delete the person ${person.name} ?`) ){
    Persons.del(id).then(() => {
      setPersons(persons.filter(n => n.id !== id)); 
      changeNotification('notification', `A fost stearsa persoana ${person.name}`)
  
  })
    .catch(error => {
  
      changeNotification('error', `A fost stearsa deja persoana ${person.name}`)
      
      setPersons(persons.filter(n => n.id !== id))
    })
  }
  else {
    
  }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} visible={notificationVisible}
        onHide={() => setNotificationVisible(false)} className={messageType}/>
      <Filter value={newFilter} function_change={handleFilter}/>
      <Form addNumber={addNumber} newName={newName} handlePersonChange={handlePersonChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <ul>
        {
          persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(
            person => <Person key={person.id} person={person} onClick={() => deleteNumber(person.id)}/>)
        }
      </ul>

      
    </div>
  )
}

export default App