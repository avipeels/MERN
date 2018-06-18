//post a book
import axios from 'axios';

export function postBooks(books) {
  return function (dispatch) {
    axios.post('/books', books)
      .then(function (response) {
        dispatch({ type: "POST_BOOK", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "POST_BOOK_REJECTED", payload: "Error in posting new book" });
      })
  }
}

//delete a book
export function deleteBook(id) {
  return {
    type: 'DELETE_BOOK',
    payload: id
  }
}

//update a book
export function updateBook(book) {
  return {
    type: 'UPDATE_BOOK',
    payload: book
  }
}

//get a book
export function getBooks() {
  return {
    type: 'GET_BOOKS',
  }
}
