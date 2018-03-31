export function booksReducers(state = {
  books:
    [{
      id: 1,
      title: 'title',
      description: 'desc',
      price: 22.22
    }, {
      id: 2,
      title: 'title',
      description: 'desc',
      price: 33.22
    }]
}, action) {
  switch (action.type) {
    case 'GET_BOOKS':
      return { ...state, books: [...state.books] }
      break;

    case 'POST_BOOK':
      // let books = state.books.concat(action.payload);
      // return { books };
      return { books: [...state.books, ...action.payload] }
      break;

    case 'DELETE_BOOK':
      //create a copy
      const currentBooksCopy = [...state.books];
      //find index of to be deleted book
      const indexToBeDeleted = currentBooksCopy.findIndex(
        function (book) {
          return book.id === action.payload.id;
        });
      //slice the array
      return { books: [...currentBooksCopy.slice(0, indexToBeDeleted), ...currentBooksCopy.slice(indexToBeDeleted + 1)] };
      break;

    case 'UPDATE_BOOK':
      //copy
      const currentBooksCopyUpdate = [...state.books];
      //get the id of the book to be updated
      const indexToUpdate = currentBooksCopyUpdate.findIndex(function (book) {
        return book.id === action.payload.id;
      });
      //update the value of the book
      const updatedBook = { ...currentBooksCopyUpdate[indexToUpdate], title: action.payload.title, description: action.payload.description, price: action.payload.price };
      //replace the updatedBook value over the old value
      return {
        books: [...currentBooksCopyUpdate.slice(0, indexToUpdate), updatedBook, ...currentBooksCopyUpdate.slice(indexToUpdate + 1)]
      }


      break;
  }
  return state;
}