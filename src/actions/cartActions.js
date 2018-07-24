//ADD TO CART
export function addToCart(book) {
  return {
    type: 'ADD_TO_CART',
    payload: book
  }
}
//DELETE FROM CART
export function deleteCartItem(cart) {
  return {
    type: 'DELETE_CART_ITEM',
    payload: cart
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
  return {
    type: 'UPDATE_CART',
    payload: updatedCart
  }
}