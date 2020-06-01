import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCategories,
  addingCategory,
  deleteCategory
} from '../store/spending'
import EditCategoryName from './EditCategoryName'

class CategoryUpdate extends React.Component {
  constructor() {
    super()
    this.state = {newCategory: '', amount: 0, edit: false}
    this.handleChange = this.handleChange.bind(this)
    this.addCategory = this.addCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.reset = this.reset.bind(this)
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
    this.setState({newCategory: '', amount: 0})
  }

  async deleteCategory(id) {
    await this.props.deleteCategory(id)
    event.preventDefault()
  }

  editCategory(catItem) {
    this.setState({edit: catItem})
    console.log('???', this.state.edit)
    event.preventDefault()
  }

  reset() {
    this.setState({edit: false})
  }

  render() {
    return (
      <div className="border rounded p-3 mb-2 bg-info text-white">
        <div className="text-uppercase">
          <b>Customize Your Categories</b>
        </div>
        {this.props.categories.map(catItem => {
          return (
            <div key={catItem.id}>
              {catItem.categoryType}
              {catItem.id > 4 ? (
                <span
                  className="editButton oi oi-pencil"
                  onClick={() => {
                    this.editCategory(catItem)
                  }}
                />
              ) : null}
              {this.state.edit.id === catItem.id ? (
                <EditCategoryName item={this.state.edit} reset={this.reset} />
              ) : null}
            </div>
          )
        })}
        <div className="border rounded p-3 mb-2 bg-secondary text-white">
          <form>
            <label htmlFor="newCategory:">New Category:</label>
            <input
              name="newCategory"
              type="text"
              value={this.state.newCategory}
              onChange={this.handleChange}
            />
            <label htmlFor="amount:">Budget For New Category:</label>
            <input
              name="amount"
              type="number"
              value={this.state.amount}
              onChange={this.handleChange}
            />
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={() => {
                this.addCategory(this.state)
              }}
            >
              Add
            </button>
          </form>
        </div>
        <button
          className="btn btn-light btn-sm"
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
