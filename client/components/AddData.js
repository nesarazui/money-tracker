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
      <div className="border rounded p-3 mb-2 bg-info text-white">
        <div className="text-uppercase">
          <b>
            {this.state.isUpdating ? 'Update Details' : 'Enter Spending Here'}:
          </b>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="item:">Line Item: </label>
            <input
              className="form-control"
              id="formGroupExampleInput"
              name="item"
              type="text"
              value={this.state.item}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount:">Amount: </label>
            <input
              className="form-control"
              id="formGroupExampleInput"
              name="amount"
              type="number"
              placeholder="Enter Amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId:">Category: </label>
            <select
              className="form-control"
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
                  className="form-control"
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
          </div>

          <div className="form-group">
            <label htmlFor="date:">Date: </label>
            <input
              className="form-control"
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>

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
        {/* <div>
        <button
          onClick={() => {
            this.props.history.goBack()
          }}
        >
          Back
        </button>
        </div> */}
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
