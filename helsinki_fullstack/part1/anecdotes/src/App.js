import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Header = ({text}) => <h1> {text} </h1> 




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  //const ary = new Uint8Array(anecdotes.length);
  const ary = Array(anecdotes.length).fill(0)
  const [l, Changearray] = useState(ary)
  
  console.log("0 vector: ", ary);
  console.log("l vector: ", l);


  const get_rand = () => { 
    const min = Math.floor(0);
    const max = Math.ceil(anecdotes.length);


    const k = Math.floor(Math.random() * (max - min) + min);
    console.log("random: ", k);
    setSelected(k);
    return k
    }

  //votes array:
  const VerifyMax = () => { 
    console.log(l);
    const val_max = Math.max(...l); 
    console.log("Val max:  ", val_max);
    const idx_max = l.indexOf(val_max); 
    console.log("index maxim: ", idx_max);
    //ChangeMostVoted(idx_max); 
    return(
      <>
      <p> {anecdotes[idx_max]} </p>
      <p>  having {val_max} votes </p>
      </>
    )
    //console.log("index maxim: ", idx_max, "adica anecdota: ", anecdotemax[idx_max]);
  }
  
  const IncreaseVote = (props) => {
  console.log("pazea:" , props.selected, props.l);
  const ary2 = [...props.l];
  ary2[props.selected] += 1;
  Changearray(ary2);
  
  }

  
  
  return (
    <div>
      <Header text={"Anecdote of the day is... "}/>
      
      
      <p> {anecdotes[selected]}  </p>
      <Button handleClick={get_rand} text={"get a random anecdote.."}/>
      <Button handleClick={() => IncreaseVote({selected, l})} text={"Vote this anecdote."}/>
      <p> this has  {l[selected]} votes. </p>
      <Header text={"The anecdote with the most votes is... "}/>
      {VerifyMax()}
      
      
      
      
    </div>
  )
}

export default App