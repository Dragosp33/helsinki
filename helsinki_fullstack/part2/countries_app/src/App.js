import { useState, useEffect } from 'react'

import Filter from './Filter'
import Country from './Country'
import CountriesHandler from './CountriesHandler'
import Notification from './Notification'
import Countries from "./services/Countries"


const App = () => {


  const [countries, setCountries] = useState([])
  const [message, setMessage] = useState('')
  const [newFilter, setNewFilter] = useState('')

  
  useEffect(() => {
    console.log('effect')
    Countries.getAll().then(initialCountries => {
      const searchedCountries = initialCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      if(searchedCountries.length > 10) {
        setCountries([]);
        setMessage('Too many matches, try to be more specific')
        console.log("Too many matches, try to be more specific.")
        
      }
      else if(searchedCountries.length === 0){setMessage('No matches'); setCountries([]);}
      else {
      console.log("tari cautate:" , searchedCountries)
      setCountries(searchedCountries)
      setMessage('');
    }
      }).catch(error => {
        console.log("eroare: ", error);
      })
  }, [newFilter])
  
  console.log('render', countries.length, 'Countries')
  console.log('tari gasite:', countries);
  console.log('mesaj : ', message);

  const handleFilter = (event) => {
    setNewFilter(event.target.value);

  }


  return (
    <div>
      <Filter value={newFilter} function_change={handleFilter} />
      <Notification message={message} />
      <CountriesHandler countries={countries}/>

    </div>
  )


}

export default App;