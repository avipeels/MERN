import { createStore } from "redux";

//step3 - define reducer
const reducer = function (state = {}, action) {
  switch (action.type) {
    case 'POST_BOOK':
      return state = action.payload;
      break;
  }
  return state;
}

//step1 - create store
const store = createStore(reducer);

store.subscribe(() => {
  console.log('current state is:', store.getState());
  console.log('current state is:', store.getState().price);


})
//step2 - create action and dispatch them
store.dispatch({
  type: 'POST_BOOK',
  payload: {
    id: 1,
    title: 'title',
    description: 'desc',
    price: 22.22
  }
});


