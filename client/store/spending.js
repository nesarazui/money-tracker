import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_SPENDING = 'GET_SPENDING'

//INITIAL STATE
const initialState = {spending: []}

//ACTION CREATOR
const getSpending = spending => {
  return {
    type: GET_SPENDING,
    spending
  }
}

//THUNK CREATOR
export const fetchSpendLog = () => {
  return async dispatch => {
    try {
      console.log('DID THE THUNK GET HIT')
      const {data} = await axios.get('/api/spending')
      dispatch(getSpending(data))
      console.log('THIS IS THE THUNK DATA', data)
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SPENDING:
      return {...state, spending: action.spending}
    default:
      return state
  }
}
