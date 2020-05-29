import React from 'react'
import {Link} from 'react-router-dom'

export const AddDataWindow = () => {
  return (
    <div className="container">
      <Link to="/addspending">
        <b>Log Your Spending</b>
      </Link>
    </div>
  )
}
