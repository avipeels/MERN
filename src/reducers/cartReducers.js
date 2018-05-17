
export function cartReducers(state = { cart: [] }, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: action.payload }
      break;
    case 'DELETE_CART_ITEM':
      return { ...state, cart: action.payload }
      break;
    case 'UPDATE_CART':
      // create a copy of current array of carts
      const currentCartItemToUpdate = [...state.cart];
      const indexToUpdate = currentCartItemToUpdate.findIndex(
        function (book) {
          return book._id === action._id;
        }
      )
      const newBookToUpdate = {
        ...currentCartItemToUpdate[indexToUpdate],
        quantity: currentCartItemToUpdate[indexToUpdate].quantity + action.unit
      }

      let updatedCart = [...currentCartItemToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentCartItemToUpdate.slice(indexToUpdate + 1)]
      return {
        ...state,
        cart: updatedCart
      }
      break;
  }
  return state;
}