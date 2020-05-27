import React from 'react'
import {connect} from 'react-redux'
import {
  addSpend,
  fetchSpendLog,
  fetchCategories,
  addingCategory,
  updateItem
} from '../store/spending'
const moment = require('moment')

class AddData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: '',
      amount: 0,
      categoryId: 1,
      newCategory: '',
      isUpdating: !!this.props.spendLog,
      date: moment().format('YYYY-MM-DD')
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addCategory = this.addCategory.bind(this)
    this.updateItemLog = this.updateItemLog.bind(this)
  }

  componentDidMount() {
    if (this.props.spendLog) {
      this.setState({
        item: this.props.spendLog.item,
        amount: this.props.spendLog.amount,
        categoryId: this.props.spendLog.categoryId,
        newCategory: '',
        isUpdating: !!this.props.spendLog,
        date: this.props.spendLog.date
      })
    }
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.addSpend(this.state)
    await this.props.fetchSpendLog()
    this.setState({
      item: '',
      amount: 0,
      categoryId: 1,
      newCategory: '',
      isUpdating: !!this.props.spendLog,
      date: moment().format('YYYY-MM-DD')
    })
  }

  async addCategory(newCat) {
    await this.props.addingCategory(newCat)
    let id = this.props.categories[this.props.categories.length - 1].id
    this.setState({categoryId: id})
  }

  async updateItemLog(id, event) {
    event.preventDefault(event)
    await this.props.updateItem(id, this.state)
    this.props.reset()
  }

  render() {
    return (
      <div className="container">
        <div className="headerText">
          <b>
            {this.state.isUpdating ? 'Update Details' : 'Enter Spending Here'}:
          </b>
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
          {this.state.isUpdating ? (
            <button
              type="button"
              onClick={() => {
                this.updateItemLog(this.props.spendLog.id, event)
              }}
            >
              Update
            </button>
          ) : (
            <button type="submit">Add</button>
          )}
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
    addingCategory: newCat => dispatch(addingCategory(newCat)),
    updateItem: (id, updatedObj) => dispatch(updateItem(id, updatedObj))
  }
}

const mapState = state => {
  return {
    categories: state.spending.categories
  }
}
const connectedToAddData = connect(mapState, mapDispatch)(AddData)

export default connectedToAddData
