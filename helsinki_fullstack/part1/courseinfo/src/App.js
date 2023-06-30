const Header = (course) => {
  return (
    <div>
      <h1> {course.name} </h1>
    </div>
  )


}


const Part = (numero) => {
  //console.log(numero)
  return (
    <div>
      <p> {numero.name} {numero.numar} </p>
    </div>
  )

}

const Content = ({array}) => {
  
  console.log("Array: ", array, typeof(array))
  console.log("array[0]: ", array[0])
  const k = array
  return (
    <div>
      {k.map(item => {
        
        return <Part name={item.name} numar={item.exercises} key={item.name}/>
      })}

    </div>
  )
}


const Total = (parts) => {
 // console.log("nr ex: ", a1, a2, a3)
  return(
    <div>
      <p> Total number of exercises {parts.a1 + parts.a2 + parts.a3}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [ 
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
   {
    name: 'Using props to pass data',
    exercises: 7
    },
  {
    name: 'State of a component',
    exercises: 14
    } 
  ]
  }

  //const continut = [ {name: part1, numar: exercises1}, {name: part2, numar: exercises2}, {name: part3, numar: exercises3}, ]
  

  return (
    <div>
      <Header name={course.name} />
    
   
      <Content array = {course.parts} />
      <Total a1={course.parts[0].exercises} a2={course.parts[1].exercises} a3={course.parts[2].exercises}/>
      
    </div>
  )
}

export default App