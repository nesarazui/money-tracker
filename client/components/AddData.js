import React from 'react'
import {connect} from 'react-redux'
import {addSpend, fetchSpendLog} from '../store/spending'
const moment = require('moment')

class AddData extends React.Component {
  constructor() {
    super()
    this.state = {
      item: '',
      amount: 0,
      categoryId: 1,
      date: moment().format('YYYY-MM-DD')
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.addSpend(this.state)
    await this.props.fetchSpendLog()
  }

  render() {
    return (
      <div>
        <b>Enter Spending Here:</b>
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
            <option value="1">Food</option>
            <option value="2">Drink</option>
            <option value="3">Entertainment</option>
            <option value="4">Bills</option>
          </select>

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
    }
  }
}

const connectedToAddData = connect(null, mapDispatch)(AddData)

export default connectedToAddData
