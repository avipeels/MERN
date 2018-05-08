import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { Provider } from "react-redux";
//import reducers
import reducers from "./reducers/index";
//import actions
import { addToCart } from "./actions/cartActions";
import { postBooks, deleteBook, updateBook } from "./actions/booksActions";



//step1 - create store
//step2 - create actions and dispatch them
//step3 - define reducer

const middleWare = applyMiddleware(logger);
const store = createStore(reducers, middleWare);

import BookList from "./components/BookList";
// BOOK ACTIONS
render(
  <Provider store={store}>
    <BookList />
  </Provider>, document.getElementById('app'));

//action create for posting
// store.dispatch(postBooks(
//   [{
//     id: 1,
//     title: 'title',
//     description: 'desc',
//     price: 22.22
//   }, {
//     id: 2,
//     title: 'title',
//     description: 'desc',
//     price: 33.22
//   }]
// ));

// //action for deleting
// store.dispatch(deleteBook({ id: 2 }))

// //action for update
// store.dispatch(updateBook({ id: 1, title: 'updated 1 title', description: 'desc1', price: 11.22 }));

// //CART ACTIONS

// //action to add to cart
// store.dispatch(addToCart([{ cart_id: 2 }]));



