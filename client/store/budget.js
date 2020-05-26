import axios from 'axios'

//ACTION TYPE
const GET_BUDGET = 'GET_BUDGET'

//ACTION CREATOR
const getBudget = budget => {
  return {
    type: GET_BUDGET,
    budget
  }
}

//THUNK
export const fetchingBudget = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/budget')
      dispatch(getBudget(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const editBudgetItem = (id, updatedAmount) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/budget/${id}`, updatedAmount)
      dispatch(getBudget(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//INITIAL STATE
const initialState = {budget: []}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BUDGET:
      return {...state, budget: action.budget}
    default:
      return state
  }
}
