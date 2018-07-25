import axios from 'axios'
//GET CART
export function getCart() {
  return function (dispatch) {
    axios.get('/api/cart')
      .then(function (response) {
        dispatch({ type: "GET_CART", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "GET_CART_REJECTED", msg: "error while getting cart data from session" })
      })
  }
}
//ADD TO CART
export function addToCart(cart) {
  return function (dispatch) {
    axios.post('/api/cart', cart)
      .then(function (response) {
        dispatch({ type: "ADD_TO_CART", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "ADD_TO_CART_REJECTED", msg: 'error when adding to the cart' })
      })
  }
}
//DELETE FROM CART
export function deleteCartItem(cart) {
  return function (dispatch) {
    axios.post('/api/cart', cart)// we are using post instead of delete as this not a delete operation. This is just an update cart operation
      .then(function (response) {
        dispatch({ type: "DELETE_CART_ITEM", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "DELETE_CART_ITEM_REJECTED", msg: 'error when deleteing the cart' })
      })
  }
}
//UPDATE THE CART
export function updateCart(_id, unit, cart) {
  const currentCartItemToUpdate = cart;
  const indexToUpdate = currentCartItemToUpdate.findIndex(
    function (book) {
      return book._id === _id;
    }
  )
  const newBookToUpdate = {
    ...currentCartItemToUpdate[indexToUpdate],
    quantity: currentCartItemToUpdate[indexToUpdate].quantity + unit,

  }

  let updatedCart = [...currentCartItemToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentCartItemToUpdate.slice(indexToUpdate + 1)]
  return function (dispatch) {
    axios.post('/api/cart', updatedCart)
      .then(function (response) {
        dispatch({ type: "UPDATE_CART", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "UPDATE_CART_REJECTED", msg: 'error when updating cart' })
      })
  }
}