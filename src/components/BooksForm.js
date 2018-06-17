import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { findDOMNode } from "react-dom";
import { postBooks, deleteBook } from "../actions/booksActions";
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class BooksForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      price: '',
    }
  };
  handleSubmit = () => {

    const book = [{
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
    }];

    this.props.postBooks(book);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.priceChange = this.priceChange.bind(this);

  }
  titleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  descriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }
  priceChange = (e) => {
    this.setState({
      price: e.target.value
    })
  }
  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBook(bookId);
  }
  render() {
    const booksList = this.props.books.map(function (booksArr) {
      return (
        <option key={booksArr._id}>{booksArr._id}</option>
      )
    })
    return (
      <div className="well">
        <div className="panel">
          <div className="form-group" id="title">
            <label className="control-label">Title</label>
            <input className="form-control" type="text" placeholder="title" value={this.state.title} onChange={this.titleChange}></input>
          </div>

          <div className="form-group" id="description">
            <label className="control-label">Description</label>
            <input className="form-control" type="text" placeholder="description" value={this.state.description} onChange={this.descriptionChange}></input>
          </div>

          <div className="form-group" id="price">
            <label className="control-label">Price</label>
            <input className="form-control" type="text" placeholder="price" value={this.state.price} onChange={this.priceChange}></input>
          </div>
          <button onClick={this.handleSubmit} className="btn-primary">Save Book </button>
        </div>

        <div className="panel" style={{ marginTop: '25px' }}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select a book id to delete</ControlLabel>
            <FormControl ref="delete" componentClass="select" placeholder="select">
              <option value="select">select</option>
              {booksList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete Book</Button>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postBooks,
    deleteBook
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
