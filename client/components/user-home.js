import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Dashboard from './Dashboard'
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
      <Dashboard />
      <AddData />
      <SpendLog />
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
