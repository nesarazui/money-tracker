import React from 'react'
import {connect} from 'react-redux'
import {updateCategory} from '../store/spending'

class EditCategoryName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({name: this.props.item.categoryType})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateCategory(this.props.item.id, this.state)

    this.props.reset()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name:">
            Update Name of Category '{this.props.item.categoryType}':{' '}
          </label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateCategory: (id, updatedObj) => dispatch(updateCategory(id, updatedObj))
  }
}

const connectedToEditCategory = connect(null, mapDispatch)(EditCategoryName)

export default connectedToEditCategory
