import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postBooks } from "../actions/booksActions";
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";
import ReactDOM from "react-dom";

class BooksForm extends React.Component {

  handleSubmit(e) {
    alert(e);
    const book = [{
      title: e.target.value,
      description: this.description.value,
      price: this.price.value,
    }];
    this.props.postBooks(book);
  }
  render() {
    return (
      <div className="well">
        <div className="panel">
          <div className="form-group" id="title">
            <label>Title</label>
            <input type="text" placeholder="title"></input>
          </div>

          <div id="description">
            <label>Description</label>
            <input type="text" placeholder="description"></input>
          </div>

          <div id="price">
            <label>Price</label>
            <input type="text" placeholder="price"></input>
          </div>
          <Button onClick={this.handleSubmit.bind(this)} className="primary">Save</Button>
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postBooks }, dispatch);
}
export default connect(null, mapDispatchToProps)(BooksForm);
