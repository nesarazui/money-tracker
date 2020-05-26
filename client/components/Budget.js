import React from 'react'
import {connect} from 'react-redux'
import {fetchingBudget} from '../store/budget'
import {totalSpend} from '../utility'
import UpdateBudget from './UpdateBudget'

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
      <div className="container">
        <div className="headerText">
          <b>Your Current Monthly Budget</b>
        </div>
        {this.props.budget.map(item => {
          return (
            <div key={item.id}>
              {item.category.categoryType}: {item.amount}
              <button type="button" onClick={() => this.updateValue(item)}>
                Update
              </button>
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

        <p>
          You have budgeted <b>${totalSpend(this.props.budget)}</b> per month.
        </p>
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
