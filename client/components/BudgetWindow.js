import React from 'react'
import {Link} from 'react-router-dom'

export const BudgetWindow = () => {
  return (
    <div className="container">
      <Link to="/budget">
        <b>View Your Budget</b>
      </Link>
    </div>
  )
}
