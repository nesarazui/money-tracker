import React from 'react'
import {connect} from 'react-redux'
import {fetchSpendLog} from '../store/spending'

class SpendLog extends React.Component {
  // componentDidMount () {
  //     this.props.fetchSpendLog()
  // }
  render() {
    //console.log('HERE ARE ALL THE SPEND LOGS FOR CODY AFTER RENDER: ', this.props.spending)
    // const userLogs = this.props.spending
    return (
      <div>
        <b>View Full Log of Spending Here:</b>
        {/* <div>
                {
                    userLogs.map( (log) => {
                        return (
                            <div key={log.id}>
                                <div>Line Item: {log.item}</div>
                                <div>Amount: {log.amount} </div>
                                <div>Category: {log.category}</div>
                                <div>Date: {log.date}</div>
                            </div>
                        )
                    })
                }
                </div> */}
      </div>
    )
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

const connectedToSpendLog = connect(mapState, mapDispatch)(SpendLog)
export default connectedToSpendLog
