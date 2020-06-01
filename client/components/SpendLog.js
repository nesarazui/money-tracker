import React from 'react'
import {connect} from 'react-redux'
import {fetchSpendLog, deleteSpendLog} from '../store/spending'
import AddData from './AddData'
const moment = require('moment')

class SpendLog extends React.Component {
  constructor() {
    super()
    this.state = {
      item: '',
      amount: 0,
      categoryId: 1,
      newCategory: '',
      editingLineItem: false,
      date: moment().format('YYYY-MM-DD')
    }
    this.deleteSpendLog = this.deleteSpendLog.bind(this)
    this.editSpendLog = this.editSpendLog.bind(this)
    this.resetEditStatus = this.resetEditStatus.bind(this)
  }

  componentDidMount() {
    this.props.fetchSpendLog()
  }

  async deleteSpendLog(id) {
    await this.props.deleteSpendLog(id)
    event.preventDefault()
  }

  editSpendLog(log) {
    this.setState({editingLineItem: log})
  }

  resetEditStatus() {
    this.setState({editingLineItem: false})
  }

  render() {
    const userLogs = this.props.spending

    if (userLogs.length > 0) {
      return (
        <div className="border rounded p-3 mb-2 bg-info text-white">
          <div className="text-uppercase">
            <b>What You've Spent On:</b>
          </div>

          <div>
            {userLogs.map(log => {
              return (
                <div className="newLine" key={log.id}>
                  <div>Line Item: {log.item}</div>
                  <div>Amount: {log.amount} </div>
                  <div>Category: {log.category.categoryType}</div>
                  <div>Date: {log.date}</div>

                  {/* <button
                    class="btn btn-light btn-sm" 
                    onClick={() => {
                      this.deleteSpendLog(log.id)
                    }}
                  >
                    Deleting
                  </button> */}
                  {/* <button
                  class="btn btn-light btn-sm" 
                    onClick={() => {
                      this.editSpendLog(log)
                    }}
                  >
                    Editing Details
                  </button> */}
                  <span
                    className="editButton oi oi-pencil"
                    onClick={() => {
                      this.editSpendLog(log)
                    }}
                  />
                  <span
                    className="deleteButton oi oi-trash"
                    onClick={() => {
                      this.deleteSpendLog(log.id)
                    }}
                  />

                  {this.state.editingLineItem.id === log.id ? (
                    <AddData
                      spendLog={this.state.editingLineItem}
                      reset={this.resetEditStatus}
                    />
                  ) : null}
                </div>
              )
            })}
          </div>
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
    } else {
      return (
        <div className="border rounded p-3 mb-2 bg-info text-white">
          <div className="text-uppercase">
            <b>What You've Spent On:</b>
          </div>
          <div>No Saved Logs</div>
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
