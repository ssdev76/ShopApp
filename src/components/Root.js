import React from 'react';
import { Provider } from 'react-redux';
import Shop from './shop/Shop';
import store from '../store';

const Root = (props) => {
  return (
    <Provider store = {store}>
      <Shop {...props}/>
    </Provider>
  )
}

export default Root;