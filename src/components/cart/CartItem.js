import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCartItem, changeCartItemCount, deleteCoupons } from '../../AC';

const CartItem = (props) => {
  const { item, deleteCartItem, changeCartItemCount } = props;
  const sale = (item && item.sale) || 0;
  const couponsForProduct = getCouponsForProduct(props);

  return (
    <div className = "cart_item">
      <div className = "cart_item_description">
        <div>{ item.title }</div>
        <div>{ item.price } ×
          <input 
            className = "cart_item_count"
            min = "0"
            type = "number"
            value = { item.count }
            size="3"
            onChange = { changeCartItemCount.bind(this, item.id) }
          /> = { item.count * item.price * (1 - sale/100) }
        </div>
        { couponsForProduct }
      </div>
      <div>
        <button
          className = "btn btn-primary"
          onClick = { deleteCartItem.bind(this, item.id) }
        >Delete from cart</button>
      </div>
      <hr/>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.string,
    count: PropTypes.number
  }),
  coupons: PropTypes.array,
  deleteCartItem: PropTypes.func,
  changeCartItemCount: PropTypes.func,
  deleteCoupons: PropTypes.func
}

CartItem.defaultProps = {
  item: {},
  coupons: []
}

const getCouponsForProduct = (props) => {
  const { coupons, deleteCoupons } = props;
  
  if ( !coupons || coupons.length === 0) {
    return;
  }

  return coupons.map((coupon) =>
    <button
      key = { coupon.id }
      className = "coupon_product btn"
      onClick = { deleteCoupons.bind(this, [coupon.id]) }
    >
      <span className = "icon_coupon_delete">×</span>
      <div>{ coupon.title }</div>
      <div>{ coupon.percent }%</div>
    </button>
  );
}

export default connect(null, { deleteCartItem, changeCartItemCount, deleteCoupons })(CartItem);