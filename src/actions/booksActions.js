//post a book
import axios from 'axios';

export function postBooks(books) {
  return function (dispatch) {
    axios.post('/api/books', books)
      .then(function (response) {
        console.log("in books action");
        dispatch({ type: "POST_BOOK", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "POST_BOOK_REJECTED", payload: "Error in posting new book" });
      })
  }
}

//get a book
export function getBooks() {
  return function (dispatch) {
    axios.get('/api/books')
      .then(function (response) {
        dispatch({ type: "GET_BOOKS", payload: response.data });
      })
      .catch(function (err) {
        dispatch({ type: "GET_BOOKS_REJECTED", payload: err });
      })
  }
}

//delete a book
export function deleteBook(id) {
  return function (dispatch) {
    axios.delete('/api/books/' + id)
      .then(function (response) {
        dispatch({ type: "DELETE_BOOK", payload: id });
      })
      .catch(function (err) {
        dispatch({ type: "DELETE_BOOK_REJECTED", payload: err });
      })
  }
}

//update a book
export function updateBook(book) {
  return {
    type: 'UPDATE_BOOK',
    payload: book
  }
}

//reset the button

export function resetButton() {
  return {
    type: 'RESET_BUTTON',
  }
}


