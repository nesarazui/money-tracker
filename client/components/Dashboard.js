import React from 'react'
import {connect} from 'react-redux'
import {fetchingBudget} from '../store/budget'
import {totalSpend, monthlySpend, monthlyDifference} from '../utility'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchingBudget()

    //   let monthSpend = totalSpend(this.props.spending)
    //   let yearSpend = monthlySpend(this.props.spending)
    //   let monthlyBudget = totalSpend(this.props.budget)
    //   this.setState({monthlySpend: monthSpend, yearlySpend: yearSpend, monthlyBudget: monthlyBudget})
  }

  render() {
    let monthlyActual = monthlySpend(this.props.spending)
    let yearlyActual = totalSpend(this.props.spending)
    let monthlyBudget = totalSpend(this.props.budget)
    let monthDifference = monthlyDifference(monthlyActual, monthlyBudget)
    console.log('???', this.props.budget)
    if (this.props.spending && this.props.budget.length > 0) {
      return (
        <div className="border rounded p-3 mb-2 bg-info text-white">
          <div className="text-uppercase">
            <b>At A Glance:</b>
          </div>

          <div>Yearly Spending To Date: {yearlyActual}</div>
          <div>Monthly Spending To Date: {monthlyActual}</div>

          <div>Your Monthly Budget is: {monthlyBudget}</div>
          {monthDifference > 0 ? (
            <div>
              You Are Under Your Monthly Budget By ${monthDifference}. Keep It
              Up!
            </div>
          ) : (
            <div>
              Warning: You Are Over Your Monthly Budget By ${Math.abs(
                monthDifference
              )}.
            </div>
          )}
        </div>
      )
    } else {
      return <div> Is Loading</div>
    }
  }
}

const mapState = state => {
  return {
    spending: state.spending.spending,
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

const connectedToDashboard = connect(mapState, mapDispatch)(Dashboard)
export default connectedToDashboard
