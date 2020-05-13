import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_SPENDING = 'GET_SPENDING'
const ADD_SPENDING = 'ADD_SPENDING'

//INITIAL STATE
const initialState = {spending: []}

//ACTION CREATOR
const getSpending = spending => {
  return {
    type: GET_SPENDING,
    spending
  }
}

const addSpending = newSpend => {
  return {
    type: ADD_SPENDING,
    newSpend
  }
}

//THUNK CREATOR
export const fetchSpendLog = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/spending/year')
      dispatch(getSpending(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addSpend = newSpendObj => {
  return async dispatch => {
    try {
      console.log('ROGER THAT!')
      const {data} = await axios.post('/api/spending/', newSpendObj)
      return dispatch(addSpending(data))
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
