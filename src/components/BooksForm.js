import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postBooks } from "../actions/booksActions";
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";
import ReactDOM from "react-dom";

class BooksForm extends React.Component {

  handleSubmit(e) {
    const book = [{
      title: ReactDOM.findDOMNode(this.title),
      description: ReactDOM.findDOMNode(this.description),
      price: ReactDOM.findDOMNode(this.price),
    }];
    this.props.postBooks(book);
  }
  render() {
    return (
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="title" ref="title"></FormControl>
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl type="text" placeholder="description" ref="description"></FormControl>
          </FormGroup>

          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl type="text" placeholder="price" ref="price"></FormControl>
          </FormGroup>
          <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save</Button>
        </Panel>
      </Well>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postBooks }, dispatch);
}
export default connect(null, mapDispatchToProps)(BooksForm);
