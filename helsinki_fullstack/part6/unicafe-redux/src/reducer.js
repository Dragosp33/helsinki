const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    
    case 'GOOD':
      const modifiedstate = { ...state, good: state.good+1}
      return modifiedstate
    case 'OK':
      const modifiedstate2 = { ...state, ok: state.ok+1}
      return modifiedstate2
    case 'BAD':
      const modifiedstate3 = { ...state, bad: state.bad+1}
      return modifiedstate3
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
