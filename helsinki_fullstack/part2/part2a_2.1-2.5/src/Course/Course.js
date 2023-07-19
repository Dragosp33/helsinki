import Header from "./Header"
import Content from "./Content";

const Course = ({course}) => {
    console.log("curs in Course.js : ", course);

    
    const initialV = 0;
    const sumWithInitial = course.parts.map(part => part.exercises).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialV
      );
      
    console.log(sumWithInitial);

    return (
      <>
        <Header name={course.name}/>
        <ul>
        {course.parts.map(content => 
          <Content key={content.id} parts={content} />
        )}
        </ul>
        <p> Total {sumWithInitial} exercises. </p>
        
      </>
    )
  
  
  }

export default Course