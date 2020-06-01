import React from 'react'
import {connect} from 'react-redux'
import {editBudgetItem} from '../store/budget'

class UpdateBudget extends React.Component {
  constructor() {
    super()
    this.state = {
      amount: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({amount: this.props.lineItem.amount})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    this.props.editBudgetItem(this.props.lineItem.id, this.state)
    this.props.reset()
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">
              Edit Amount for {this.props.lineItem.category.categoryType}
            </label>
            <input
              className="control-form"
              name="amount"
              type="number"
              placeholder="Enter Amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-light btn-sm" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    editBudgetItem: (id, updatedAmount) =>
      dispatch(editBudgetItem(id, updatedAmount))
  }
}

const connectedToUpdateBudget = connect(null, mapDispatch)(UpdateBudget)

export default connectedToUpdateBudget
