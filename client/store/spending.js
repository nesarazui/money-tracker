import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_SPENDING = 'GET_SPENDING'
const ADD_SPENDING = 'ADD_SPENDING'
const GET_CATEGORIES = 'GET_CATEGORIES'

//INITIAL STATE
const initialState = {spending: [], categories: []}

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

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
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
      const {data} = await axios.post('/api/spending/', newSpendObj)
      return dispatch(addSpending(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteSpendLog = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/spending/${id}`)
      return dispatch(getSpending(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateItem = (id, updatedObj) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/spending/${id}`, updatedObj)
      return dispatch(getSpending(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/categories/')
      return dispatch(getCategories(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addingCategory = newCat => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/categories/', newCat)
      return dispatch(getCategories(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addingCategoryFromLineItem = newCat => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/categories/newlineitem', newCat)
      return dispatch(getCategories(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteCategory = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/categories/${id}`)
      return dispatch(getCategories(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateCategory = (id, updatedObj) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/categories/${id}`, updatedObj)
      return dispatch(getCategories(data))
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
    case GET_CATEGORIES:
      return {...state, categories: action.categories}
    default:
      return state
  }
}
