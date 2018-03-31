import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBooks } from "../actions/booksActions";
import { Grid, Col, Row, Button } from "react-bootstrap";
import BookItem from "./BookItem";
import BooksForm from "./BooksForm";

class BookList extends React.Component {
  componentDidMount() {
    //dispatch an action
    this.props.getBooks();
  }
  render() {
    const bookList = this.props.books.map(function (booksArr) {
      return (
        <Col xs={12} sm={6} md={4} key={booksArr.id}>
          <BookItem
            id={booksArr.id}
            title={booksArr.title}
            description={booksArr.description}
            price={booksArr.price}
          />
        </Col>
      )
    })
    return (
      <Grid>
        <Row style={{ marginTop: '15px' }}>
          <Col xs={12} sm={6}>
            <BooksForm />
          </Col>
          {bookList}
        </Row>
      </Grid>
    )
  }
}
function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBooks: getBooks }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);

//connect is subscribed to the state changes
//and calls mapStateToProps to see what this component is needing from the state (books - in this case)
//(BookList)- this state data is provided to BookList component.