const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      initialState.good++;
      return initialState
    case 'OK':
      initialState.ok++;
      return initialState
    case 'BAD':
      initialState.bad++;
      return initialState
    case 'ZERO':
      initialState.good = 0;
      initialState.ok = 0;
      initialState.bad = 0;
      return initialState
    default:
      return state
  }
}

export default counterReducer