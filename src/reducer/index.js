import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo';
import cart from './cart';

export default combineReducers({
  cart: undoable(cart)
});