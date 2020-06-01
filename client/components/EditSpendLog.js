// import React from 'react'
// import {connect} from 'react-redux'
// import {fetchSpendLog, deleteSpendLog} from '../store/spending'
// const moment = require('moment')

// export default class EditSpendLog extends React.Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             item: '',
//             amount: 0,
//             categoryId: 1,
//             newCategory: '',
//             date: moment().format('YYYY-MM-DD')
//           }
//           this.handleChange = this.handleChange.bind(this)
//           this.handleSubmit = this.handleSubmit.bind(this)
//           this.addCategory = this.addCategory.bind(this)
//     }

//     componentDidMount () {
//         this.setState(this.props.spendLog)
//     }

//     render () {
//         return (
//         <div className="container">
//         <div className="headerText">
//           <b>Update Your Spend Log Item Here:</b>
//         </div>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="item:">Line Item: </label>
//           <input
//             name="item"
//             type="text"
//             value={this.state.item}
//             onChange={this.handleChange}
//           />

//           <label htmlFor="amount:">Amount: </label>
//           <input
//             name="amount"
//             type="number"
//             placeholder="Enter Amount"
//             value={this.state.amount}
//             onChange={this.handleChange}
//           />

//           <label htmlFor="categoryId:">Category: </label>
//           <select
//             name="categoryId"
//             value={this.state.categoryId}
//             onChange={this.handleChange}
//           >
//             {this.props.categories.map(catItem => {
//               return (
//                 <option key={catItem.id} value={catItem.id}>
//                   {catItem.categoryType}
//                 </option>
//               )
//             })}
//             <option value="0">Create New Category</option>
//           </select>

//           {this.state.categoryId === '0' ? (
//             <div>
//               <label htmlFor="newCategory:">New Category:</label>
//               <input
//                 name="newCategory"
//                 type="text"
//                 value={this.state.newCategory}
//                 onChange={this.handleChange}
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   this.addCategory(this.state.newCategory)
//                 }}
//               >
//                 Update
//               </button>
//             </div>
//           ) : null}

//           <label htmlFor="date:">Date: </label>
//           <input
//             name="date"
//             type="date"
//             value={this.state.date}
//             onChange={this.handleChange}
//           />

//           <button type="submit">Add</button>
//         </form>
//       </div>
//         )
//     }

// }

// // const mapState = state => {
// //     return {
// //         spending: state.spending.spending
// //     }
// // }

// // const connectedToEditSpendLog = connect (mapState)(EditSpendLog)

// // export default connectedToEditSpendLog
