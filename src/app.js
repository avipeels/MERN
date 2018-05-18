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
//react router
// import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//step1 - create store
//step2 - create actions and dispatch them
//step3 - define reducer

const middleWare = applyMiddleware(logger);
const store = createStore(reducers, middleWare);

import BookList from "./components/BookList";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import BooksForm from "./components/BooksForm";
import Main from './Main';
const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={BookList} />
          <Route path="/admin" component={BooksForm} />
          <Route path="/cart" component={Cart} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>

  </Provider>
)
// BOOK ACTIONS
render(
  Routes, document.getElementById('app'));



