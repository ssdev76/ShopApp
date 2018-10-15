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
    cart: PropTypes.object
  }

  state = {
    isOpen: false,
  }

  render() {
    const { cart } = this.props,
          items = [...cart.items],
          isOpen = this.state.isOpen,
          cartContent = this.getCartContent(),
          itemsCount = items.reduce((sum, current) => sum + current.count, 0);

    return (
      <div>
        <div className = "cart">
          <div
            onClick = { this.toggleOpenCart }
            className = "cart_icon glyphicon glyphicon-trash"
          ></div>
          <CartCounter count = {itemsCount}/>
        </div>
        { cartContent }
      </div>
    )
  }

  toggleOpenCart = (ev) => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getCartContent = () => {
    const items = this.getCartItems(),
          itemsCount = items && items.length || 0,
          totalAmount = this.getTotalAmount(items),
          couponsForCart = this.getCouponsForCart(),
          isOpen = this.state.isOpen;

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

    if (itemsCount === 0) {
      return cartContent;
    }

    return <div className = "cart_content" ref = { el => (this.checkRef = el) }>
             <div
               onClick = { this.toggleOpenCart }
               className = "close_cart"
             >×</div>
             <CartItemList items = { items }/>
             <div className = "coupons_cart">
               { couponsForCart }
             </div>
             { totalAmount }
             <ReactToPrint 
               trigger = { () => <button className = "print btn btn-primary">Print check</button> }
               content = { () => this.checkRef }
             />
           </div>;
  }

  getCartItems = () => {
    const { cart } = this.props,
          items = [...cart.items],
          coupons = [...cart.coupons];

    const cartItems = items.map((item) => {
      let cartItem = Object.assign({}, item);

      cartItem.sale = 0;
      cartItem.coupons = [];

      coupons.forEach((coupon) => {
        if (coupon.type === "cart" || coupon.product_id == cartItem.id) {
          cartItem.sale += 1 * coupon.percent;

          if (coupon.product_id == cartItem.id) {
            cartItem.coupons.push(coupon);
          }

          if (cartItem.sale >= 100) {
            return cartItem.sale = 100;
          }
        }

        return cartItem.sale;
      });

      return cartItem;
    });

    return cartItems;
  }

  getTotalAmount = (items) => {
    if (!items || items.length === 0) {
      return;
    }

    const totalAmount = items.reduce((sum, current) => {
        current.sale = (current.sale) ? current.sale : 0;

        return sum + current.price * current.count * (1 - current.sale/100);
      }, 0);
    const result = <div>Total: { totalAmount }</div>;

    return result;
  }

  getCouponsForCart = () => {
    const { cart, deleteCoupons } = this.props,
          coupons = [...cart.coupons],
          couponsForCart = coupons.filter((coupon) => {
            return coupon.type && coupon.type === "cart";
          });

    return couponsForCart.map((coupon) =>
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

export default connect((state) => ({
  cart: state.cart.present
}), { deleteCoupons })(Cart);