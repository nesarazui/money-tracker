import React from 'react'
import {connect} from 'react-redux'
import {fetchSpendLog, deleteSpendLog} from '../store/spending'

class SpendLog extends React.Component {
  constructor() {
    super()
    this.deleteSpendLog = this.deleteSpendLog.bind(this)
    this.editSpendLog = this.editSpendLog.bind(this)
  }

  componentDidMount() {
    this.props.fetchSpendLog()
  }

  async deleteSpendLog(id) {
    console.log('WHAT IS THE ID', id)
    await this.props.deleteSpendLog(id)
    event.preventDefault()
  }

  editSpendLog(id) {
    alert('EDITING SPEND LOG')
  }

  render() {
    //console.log('HERE ARE ALL THE SPEND LOGS FOR CODY AFTER RENDER: ', this.props.spending)
    const userLogs = this.props.spending
    console.log('***USERLOGS', userLogs)
    if (userLogs.length > 0) {
      return (
        <div className="container">
          <b>View Full Log of Spending Here:</b>
          <div>
            {userLogs.map(log => {
              console.log('THIS IS THE LOG: ', log)
              return (
                <div className="newLine" key={log.id}>
                  <div>Line Item: {log.item}</div>
                  <div>Amount: {log.amount} </div>
                  <div>Category: {log.category.categoryType}</div>
                  <div>Date: {log.date}</div>
                  <button
                    onClick={() => {
                      this.deleteSpendLog(log.id)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      this.editSpendLog(log.id)
                    }}
                  >
                    Edit Details
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <b>View Full Log of Spending Here:</b>
          <div>No Saved Logs</div>
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSpendLog: () => {
      dispatch(fetchSpendLog())
    },
    deleteSpendLog: id => dispatch(deleteSpendLog(id))
  }
}

const mapState = state => {
  return {
    spending: state.spending.spending
  }
}

const connectedToSpendLog = connect(mapState, mapDispatch)(SpendLog)
export default connectedToSpendLog
