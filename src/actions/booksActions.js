//post a book
export function postBooks(books) {
  return {
    type: 'POST_BOOK',
    payload: books
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
