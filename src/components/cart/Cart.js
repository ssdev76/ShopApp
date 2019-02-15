import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print';
import { deleteCoupons } from '../../AC';
import CartItemList from './CartItemList';
import CartCounter from './CartCounter';
import './cart.css';

class Cart extends React.Component{
  static propTypes = {
    deleteCoupons: PropTypes.func,
    cart: PropTypes.object,
    cartItemsCount: PropTypes.number,
    cartTotalAmount: PropTypes.number
  }

  state = {
    isOpen: false,
  }

  render() {
    const cartContent = this.getCartContent();
    const { cartItemsCount } = this.props;

    return (
      <div>
        <div className = "cart">
          <div
            onClick = { this.toggleOpenCart }
            className = "cart_icon glyphicon glyphicon-trash"
          ></div>
          <CartCounter count = { cartItemsCount }/>
        </div>
        { cartContent }
      </div>
    )
  }

  toggleOpenCart = ev => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getCartContent = () => {
    const {cart, cartItemsCount, cartTotalAmount} = this.props;
    const couponsForCart = this.getCouponsForCart();
    const isOpen = this.state.isOpen;

    let cartContent = <div className = "cart_content">
                        <div 
                          onClick = { this.toggleOpenCart }
                          className = "close_cart"
                        >×</div>
                        <div>No items in cart</div>
                      </div>

    if (!isOpen) {
      return;
    }

    if (cartItemsCount === 0) {
      return cartContent;
    }

    return <div className = "cart_content" ref = { el => (this.checkRef = el) }>
             <div
               onClick = { this.toggleOpenCart }
               className = "close_cart"
             >×</div>
             <CartItemList items = { cart.items }/>
             <div className = "coupons_cart">
               { couponsForCart }
             </div>
             <div>Total: { cartTotalAmount }</div>
             <ReactToPrint 
               trigger = { () => <button className = "print btn btn-primary">Print check</button> }
               content = { () => this.checkRef }
             />
           </div>;
  }

  getCouponsForCart = () => {
    const { cart, deleteCoupons } = this.props,
          coupons = cart && [...cart.coupons] || [],
          couponsForCart = coupons.filter(coupon => {
            return coupon.type && coupon.type === "cart";
          });

    return couponsForCart.map(coupon =>
      <button
        key = { coupon.id }
        className = "coupon_cart btn"
        onClick = { deleteCoupons.bind(this, [coupon.id]) }
      >
        <span className = "icon_coupon_delete">×</span>
        <div>{ coupon.title }</div>
        <div>{ coupon.percent }%</div>
      </button>
    );
  }
}

const getCartItemsCount = cart => (cart && [...cart.items] || []).reduce((sum, current) => sum + current.count, 0);

const getTotalAmount = cart => (cart && [...cart.items] || []).reduce((sum, current) => {
    current.sale = (current.sale) ? current.sale : 0;
    return sum + current.price * current.count * (1 - current.sale/100);
  }, 0);

export default connect(state => ({
  cart: state.cart.present,
  cartItemsCount: getCartItemsCount(state.cart.present),
  cartTotalAmount: getTotalAmount(state.cart.present)
}), { deleteCoupons })(Cart);