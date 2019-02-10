import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo';
import cart from './cart';
import productsState from './productList';

export default combineReducers({
  cart: undoable(cart),
  productsState: productsState
});