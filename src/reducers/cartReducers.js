
export function cartReducers(state = { cart: [] }, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state, cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty:totals(action.payload).qty
      }
      break;
    case 'DELETE_CART_ITEM':
      return {
        ...state, cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty:totals(action.payload).qty
      }
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
        quantity: currentCartItemToUpdate[indexToUpdate].quantity + action.unit,

      }

      let updatedCart = [...currentCartItemToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentCartItemToUpdate.slice(indexToUpdate + 1)]
      return {
        ...state,
        cart: updatedCart,
        totalAmount: totals(updatedCart).amount,
        totalQty:totals(updatedCart).qty
      }
      break;
  }
  return state;
}

//CALCULATE TOTALS
export function totals(payloadArr) {
  const totalAmount = payloadArr.map(function (cartArray) {
    return cartArray.price * cartArray.quantity
  }).reduce(function (a, b) {
    return a + b;
  }, 0)

  const totalQty = payloadArr.map(function (qty) {
    return qty.quantity;
  }).reduce(function (a, b) {
    return a + b;
  }, 0)
  return { amount: totalAmount.toFixed(2), qty: totalQty };


}