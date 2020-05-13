import React from 'react'
import {connect} from 'react-redux'
import {totalSpend, monthlySpend} from '../utility'

class Dashboard extends React.Component {
  // componentDidMount() {
  //   this.props.fetchSpendLog()
  // }

  render() {
    if (this.props.spending) {
      return (
        <div>
          <b>At A Glance:</b>

          <div>Yearly Spending To Date: {totalSpend(this.props.spending)}</div>
          <div>
            Monthly Spedning To Date: {monthlySpend(this.props.spending)}
          </div>
        </div>
      )
    } else {
      return <div> Is Loading</div>
    }
  }
}

const mapState = state => {
  return {
    spending: state.spending.spending
  }
}

const connectedToDashboard = connect(mapState, null)(Dashboard)
export default connectedToDashboard
