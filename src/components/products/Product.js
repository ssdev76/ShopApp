import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItemToCart } from '../../AC';

const Product = (props) => {
  const { item, addItemToCart } = props;

  return (
    <div>
      <h3>{ item.title }</h3>
      <div>{ item.desc }</div>
      <div className = "product_price">{ item.price }</div>
      <button
        className = "btn btn-primary"
        onClick = { addItemToCart.bind(this, item) }
      >Add to cart</button>
    </div>
  );
}

Product.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.string
  }),
  addItemToCart: PropTypes.func
}

export default connect(null, { addItemToCart })(Product);