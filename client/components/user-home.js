import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Dashboard from './Dashboard'
import {BudgetWindow} from './BudgetWindow'
import {AddDataWindow} from './AddDataWindow'
import {SpendLogWindow} from './SpendLogWindow'
import Budget from './Budget'
import AddData from './AddData'
import SpendLog from './SpendLog'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div className="row">
        <div className="col-md-6">
          <Dashboard />
          <Budget />
          <AddData />
        </div>
        <div className="col-md-6">
          <SpendLog />
        </div>
      </div>
      {/* <Budget />
      <AddData />
      <SpendLog /> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
