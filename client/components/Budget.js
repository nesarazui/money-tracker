import React from 'react'
import {connect} from 'react-redux'
import {fetchingBudget} from '../store/budget'
import {totalSpend} from '../utility'
import UpdateBudget from './UpdateBudget'
import {Link} from 'react-router-dom'

class Budget extends React.Component {
  constructor() {
    super()
    this.state = {edit: false, lineItem: {}}
    this.updateValue = this.updateValue.bind(this)
    this.resetEditStatus = this.resetEditStatus.bind(this)
  }

  componentDidMount() {
    //fetch budget items and mount it into chart
    this.props.fetchingBudget()
  }

  updateValue(item) {
    this.setState({edit: true, lineItem: item})
  }

  resetEditStatus() {
    this.setState({edit: false})
  }

  render() {
    return (
      <div className="border rounded p-3 mb-2 bg-info text-white">
        <div className="text-uppercase">
          <b>Monthly Budget:</b>
        </div>
        {this.props.budget.map(item => {
          return (
            <div key={item.id}>
              <span
                className="editButton oi oi-pencil"
                onClick={() => this.updateValue(item)}
              />
              {item.category.categoryType}: {item.amount}
              {/* {this.state.update ? (<form>
                            <label htmlFor="amount"></label>
                            <input name="amount" type="number" placeholder="Enter Amount" value={this.state.amount} onChange={this.handleChange} />
                        </form> ): null} */}
            </div>
          )
        })}

        {this.state.edit ? (
          <UpdateBudget
            lineItem={this.state.lineItem}
            reset={this.resetEditStatus}
          />
        ) : null}

        <div className=".m-10">
          <p>
            You have budgeted <b>${totalSpend(this.props.budget)}</b> per month.
          </p>
        </div>

        <Link to="/CategoryUpdate">
          <b>Add More Categories</b>
        </Link>
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

const mapState = state => {
  return {
    budget: state.budget.budget
  }
}

const mapDispatch = dispatch => {
  return {
    fetchingBudget: () => {
      dispatch(fetchingBudget())
    }
  }
}

const connectedToBudget = connect(mapState, mapDispatch)(Budget)
export default connectedToBudget
