import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>MONEY TRACKER</h1>
    <nav>
      {isLoggedIn ? (
        <div className="row">
          {/* The navbar will show these links after you log in */}
          <div className="col-md-1">
            <Link to="/home">Home</Link>
          </div>

          <div className="col-md-1">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>

          <div className="col-md-1">
            <Link to="/budget">Budget</Link>
          </div>

          <div className="col-md-1">
            <Link to="/spendlog">Spending</Link>
          </div>

          <div className="col-md-2">
            <Link to="/addspending">Add Spending</Link>
          </div>
        </div>
      ) : (
        <div className="row">
          {/* The navbar will show these links before you log in */}
          <div className="col-md-1">
            <Link to="/login">Login</Link>
          </div>

          <div className="col-md-2">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
