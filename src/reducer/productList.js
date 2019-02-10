import { LOAD_PRODUCTS, START, SUCCESSED, FAILED, } from '../constants';

const defaultState = {
  loading: false,
  loaded: false,
  products: [],
  errorMessage: null
};

export default (productsState = defaultState, action) => {
  const {type, response, error} = action;

  switch (type) {
    case LOAD_PRODUCTS + START: {
      productsState.loading = true;
      productsState.errorMessage = null;

      return productsState;
    }
    case LOAD_PRODUCTS + SUCCESSED: {
      productsState.products = [...response];
      productsState.loading = false;
      productsState.loaded = true;

      return productsState;
    }
    case LOAD_PRODUCTS + FAILED: {
      productsState.loading = false;
      productsState.loaded = true;
      productsState.errorMessage = error.message;

      return productsState;
    }
  }

  return productsState;
}