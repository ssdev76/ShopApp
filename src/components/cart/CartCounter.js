import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CartCounter = (props) => {
  const { count } = props;

  return (
    <div className = "cart_counter">
      <span>{ count }</span>
    </div>
  );
}

CartCounter.propTypes = {
  count: PropTypes.number
}

export default CartCounter;