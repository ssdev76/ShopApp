import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CartCounter = (props) => {
  const { items } = props;
  const itemsCount = items.reduce(function (sum, current) {
    return sum + current.count;
  }, 0);

  return (
    <div className = "cart_counter">
      <span>{ itemsCount }</span>
    </div>
  );
}

CartCounter.propTypes = {
  items: PropTypes.array
}

export default connect((state) => ({
  items: state.cart.present.items
}))(CartCounter);