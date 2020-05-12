import React from 'react'
import {connect} from 'react-redux'
import {fetchSpendLog} from '../store/spending'
import annualSpend from '../utility'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchSpendLog()
  }

  render() {
    if (this.props.spending) {
      return (
        <div>
          <b>Hello This Is A Dashboard </b>

          <div>Yearly Spending To Date: {annualSpend(this.props.spending)}</div>
          <div>Monthly Spedning To Date: </div>
        </div>
      )
    } else {
      return <div> Is Loading</div>
    }
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSpendLog: () => {
      dispatch(fetchSpendLog())
    }
  }
}

const mapState = state => {
  return {
    spending: state.spending.spending
  }
}

const connectedToDashboard = connect(mapState, mapDispatch)(Dashboard)
export default connectedToDashboard
