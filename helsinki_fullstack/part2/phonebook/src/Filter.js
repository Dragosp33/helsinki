const Filter = ({value, function_change}) => {
    //console.log("person in Person.js : ", person);
   // console.log(value, function_change);
    return (
        <div>
            filter, only showing persons with <input value={value} onChange={function_change}/>
        </div>
    )
  
  
  }

export default Filter