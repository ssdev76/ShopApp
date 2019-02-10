import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer';
import productsState from '../middlewares/products';

const enhancer = applyMiddleware(productsState);
const store = createStore(reducer, {}, enhancer);

window.store = store;

export default store;