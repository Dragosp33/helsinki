const Content = ({parts}) => {
    console.log("curs in Header.js : ", parts);
    return (
        <li>{parts.name} {parts.exercises}</li> 
    )
  
  
  }

export default Content