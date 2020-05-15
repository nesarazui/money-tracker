import React from 'react'
import {connect} from 'react-redux'
import {
  addSpend,
  fetchSpendLog,
  fetchCategories,
  addingCategory
} from '../store/spending'
const moment = require('moment')

class AddData extends React.Component {
  constructor() {
    super()
    this.state = {
      item: '',
      amount: 0,
      categoryId: 1,
      newCategory: '',
      date: moment().format('YYYY-MM-DD')
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addCategory = this.addCategory.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.addSpend(this.state)
    await this.props.fetchSpendLog()
  }

  async addCategory(newCat) {
    console.log('what is the newCat', newCat)
    await this.props.addingCategory(newCat)
    let id = this.props.categories[this.props.categories.length - 1].id
    this.setState({categoryId: id})
  }

  render() {
    return (
      <div className="container">
        <div className="headerText">
          <b>Enter Spending Here:</b>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="item:">Line Item: </label>
          <input
            name="item"
            type="text"
            value={this.state.item}
            onChange={this.handleChange}
          />

          <label htmlFor="amount:">Amount: </label>
          {/* <input name="amount" type="number" min="0.00" max="10000.00" step="0.01" 
            value={this.state.amount} onChange={this.handleChange} /> */}
          <input
            name="amount"
            type="number"
            placeholder="Enter Amount"
            value={this.state.amount}
            onChange={this.handleChange}
          />

          <label htmlFor="categoryId:">Category: </label>
          <select
            name="categoryId"
            value={this.state.categoryId}
            onChange={this.handleChange}
          >
            {this.props.categories.map(catItem => {
              return (
                <option key={catItem.id} value={catItem.id}>
                  {catItem.categoryType}
                </option>
              )
            })}
            <option value="0">Create New Category</option>
          </select>

          {this.state.categoryId === '0' ? (
            <div>
              <label htmlFor="newCategory:">New Category:</label>
              <input
                name="newCategory"
                type="text"
                value={this.state.newCategory}
                onChange={this.handleChange}
              />
              <button
                type="button"
                onClick={() => {
                  this.addCategory(this.state.newCategory)
                }}
              >
                Update
              </button>
            </div>
          ) : null}

          <label htmlFor="date:">Date: </label>
          <input
            name="date"
            type="date"
            value={this.state.date}
            onChange={this.handleChange}
          />

          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addSpend: newSpendObj => dispatch(addSpend(newSpendObj)),
    fetchSpendLog: () => {
      dispatch(fetchSpendLog())
    },
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    addingCategory: newCat => dispatch(addingCategory(newCat))
  }
}

const mapState = state => {
  return {
    categories: state.spending.categories
  }
}
const connectedToAddData = connect(mapState, mapDispatch)(AddData)

export default connectedToAddData
