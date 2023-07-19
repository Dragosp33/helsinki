import Country from "./Country";

const CountriesHandler = ({countries}) => {

    //console.log(`avem aici tara: ${Country}`);

    if (countries.length > 1){
    return (
        <ul>
        {
          
          countries.map(
            country => 
            <Country key={country.tld[0]} country={country}/>)
        }
      </ul>
    )
    }
    else if(countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <h1> {country.name.common}</h1>
                <h2> Capital: {country.capital[0]}</h2>
            </div>
        )

    }
    return null;
  
  }

export default CountriesHandler;