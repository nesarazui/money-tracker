import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCategories,
  addingCategory,
  deleteCategory
} from '../store/spending'

class CategoryUpdate extends React.Component {
  constructor() {
    super()
    this.state = {newCategory: ''}
    this.handleChange = this.handleChange.bind(this)
    this.addCategory = this.addCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async addCategory(newCat) {
    await this.props.addingCategory(newCat)
    event.preventDefault()
    this.setState({newCategory: ''})
  }

  async deleteCategory(id) {
    console.log('WHAT IS THE ID', id)
    await this.props.deleteCategory(id)
    event.preventDefault()
  }

  editCategory(id) {
    alert('EDITING CATEGORY')
  }

  // showField() {
  //     return (

  //         <form>
  //             <label htmlFor="newCategory:">New Category:</label>
  //             <input
  //             name="newCategory"
  //             type="text"
  //             value={this.state.newCategory}
  //             onChange={this.handleChange}
  //             />
  //             <button
  //             type="button"
  //             onClick={() => {
  //               this.addCategory(this.state.newCategory)
  //             }}>
  //             Update
  //             </button>
  //          </form>

  //     )
  // }

  render() {
    return (
      <div>
        <b>Customize Your Categories</b>
        {this.props.categories.map(catItem => {
          console.log('****', catItem)
          return (
            <div key={catItem.id}>
              {catItem.categoryType}
              <button
                onClick={() => {
                  this.deleteCategory(catItem.id)
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  this.editCategory(catItem.id)
                }}
              >
                Edit
              </button>
            </div>
          )
        })}
        {/* <button onClick={this.showField}>New Category</button> */}
        <div className="headerText">
          <form>
            <label htmlFor="newCategory:">New Category:</label>
            <input
              name="newCategory"
              type="text"
              value={this.state.newCategory}
              onChange={this.handleChange}
            />
            <button
              type="button"
              onClick={() => {
                this.addCategory(this.state.newCategory)
              }}
            >
              Add
            </button>
          </form>
        </div>
        <button
          onClick={() => {
            this.props.history.goBack()
          }}
        >
          Back
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    addingCategory: newCat => dispatch(addingCategory(newCat)),
    deleteCategory: id => dispatch(deleteCategory(id))
  }
}

const mapState = state => {
  return {
    categories: state.spending.categories
  }
}
const connectedToCategoryUpdate = connect(mapState, mapDispatch)(CategoryUpdate)

export default connectedToCategoryUpdate
