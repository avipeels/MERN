import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBooks } from "../actions/booksActions";

import BookItem from "./BookItem";
import BooksForm from "./BooksForm";
import Cart from "./Cart";
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class BookList extends React.Component {
  componentDidMount() {
    //dispatch an action
    this.props.getBooks();
  }
  render() {
    const bookList = this.props.books.map(function (booksArr) {
      return (
        <div className="col-xs-12 col-sm-6 col-sm-4" >
          <BookItem
            key={booksArr._title}
            _id={booksArr._id}
            title={booksArr.title}
            description={booksArr.description}
            images={booksArr.images}
            price={booksArr.price}
          />
        </div>
      )
    })
    return (
      <div className="">
        <div className="" style={{ marginTop: '15px' }}>
          {bookList}
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
  return bindActionCreators({ getBooks: getBooks }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);

//connect is subscribed to the state changes
//and calls mapStateToProps to see what this component is needing from the state (books - in this case)
//(BookList)- this state data is provided to BookList component.