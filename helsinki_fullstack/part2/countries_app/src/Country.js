import { useState } from "react";
import Weather from "./Weather";


const Country = ({country}) => {

  console.log("country in country.js", country)

    //console.log(`avem aici tara: ${Country}`);
    const [show, setShow] = useState(false)

    const showHide = () => {
      setShow(!show);
    }
    
    if(show){
      return(
        <>
        <li> {country.name.common} <button onClick={showHide}> hide </button></li>
        <p> Show/Hide working.</p>
        <h1> Capital: {country.capital[0]}</h1>
        <h2> Area: {country.area}</h2>
        <ul> Languages:
          {
            Object.entries(country.languages)
            .map( ([key, value]) => <li key={key}>{value}</li> )
          }

         
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>;
        <Weather capitalLatLong ={country.capitalInfo.latlng}/>
        </>
      )
    }
    return (
      <li> {country.name.common} <button onClick={showHide}> show </button></li>
        //TODO: Separate SingleCountry module with a show/hide button that shows information about the country.
    )
  
  
  }

export default Country;