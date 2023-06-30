import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const StatisticLine = (props) => {
  return (
  <>
  <tr>
  <td> {props.text} : </td> 
  <td> {props.value} </td> 
  </tr>
  </>
  )
  }


const Statistics = (props) => {
  const allnr = props.good + props.bad + props.neutral

  if(allnr > 0){
  return(
    <div>
      <table>
      <thead>
      <tr>
      <th >  Vote : </th>
      <th > Number: </th>
      </tr>
      </thead>
      <tbody>
      
      <StatisticLine text="good " value={props.good}/>
      
      
      <StatisticLine text="neutral " value={props.neutral}/>
      <StatisticLine text="bad " value={props.bad}/>
      <StatisticLine text="all " value={allnr}/>
      <StatisticLine text="percent positives: " value={(props.good/allnr * 100).toFixed(2) } />
      <StatisticLine text="percent negatives: " value={(props.bad/allnr * 100).toFixed(2) } />
      </tbody>
      </table>

    </div>
  ) }
  else {
    return <div>
      <h1> No statistics registered, leave a feedback to view statistics</h1>
    </div>
  }
  }

const Header = (props) => (
  <h1> {props.text} </h1>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text={'Give feedback'}/>
      <Button handleClick={increaseGood} text={"Good"} />
      <Button handleClick={increaseNeutral} text={"OK"} />
      <Button handleClick={increaseBad} text={"Bad"} />
      <Statistics good={good} neutral = {neutral} bad ={bad} />
    </div>
  )
}

export default App

