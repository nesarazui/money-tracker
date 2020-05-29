import React from 'react'
import {Link} from 'react-router-dom'

export const SpendLogWindow = () => {
  return (
    <div className="container">
      <Link to="/spendlog">
        <b>View Your Spending</b>
      </Link>
    </div>
  )
}
