import React from 'react';
import PropTypes from 'prop-types'
import Product from './Product';
import './products.css';

const ProductList = (props) => {
  const { items } = props;

  if ( !items || items.length === 0) {
    return;
  }

  const products = items.map((item) => 
      <li key = { item.id }>
        <Product item = { item }/>
      </li>
    );

  return (
    <ul>
      { products }
    </ul>
  );
}

ProductList.propTypes = {
  items: PropTypes.array
}

export default ProductList;