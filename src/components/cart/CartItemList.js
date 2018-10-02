import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

const CartItemList = (props) => {
  const { items } = props;
  
  if ( !items || items.length === 0) {
    return;
  }

  const cartItems = items.map((item) => 
      <CartItem
        key = { item.id }
        item = { item }
        coupons = { item.coupons }
      />
    );

  return (
    <div className = "cart_item_list">
      { cartItems }
    </div>
  );
}

CartItemList.propTypes = {
  items: PropTypes.array
}

export default CartItemList;