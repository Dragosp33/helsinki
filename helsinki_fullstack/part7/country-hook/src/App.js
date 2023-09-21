import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const url = "https://studies.cs.helsinki.fi/restcountries/api/name"
  const [country, setCountry] = useState(null)
  //const [response, setResponse] = useState(null)

 /* const onChange = (event) => {
    setCountry(event.target.value)
  }*/
  let found = false
  useEffect(() => {
      async function fetchdata() {
        const request = await axios.get(`${url}/${name}`)
        console.log(request.data)
        setCountry(request.data)
      }
      fetchdata() },
      [name],
    );
  if (country) {
   found = true 
  }

  return {...country, found}

}

const Country = ({ country }) => {
  console.log(`Country in country component: `, country)
  if (!country) {
    return null
  }
  if(!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }


  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App