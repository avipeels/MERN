import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postBooks } from "../actions/booksActions";
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class BooksForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      price: '',
    }
  }
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
  render() {
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
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postBooks }, dispatch);
}
export default connect(null, mapDispatchToProps)(BooksForm);
