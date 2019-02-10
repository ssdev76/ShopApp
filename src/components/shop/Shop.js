import React from 'react';
import ReactDOM from 'react-dom';
import ReactToPrint from 'react-to-print';
import ProductList from '../products/ProductList';
import Cart from '../cart/Cart';
import Coupon from '../coupons/Coupon';
import UndoRedo from '../undoredo/UndoRedo';
import store from '../../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shop.css';

class Shop extends React.Component {

  state = {
    coupons: []
  }

  componentDidMount() {
    const coupons = [{                          /////ONLY FOR TEST
      id: 1,
      title: "TEST-COUPON-FOR-CART",
      percent: 10,
      type: "cart"
    }, {
      id: 2,
      title: "TEST-COUPON-FOR-PRODUCT #2",
      percent: 59,
      type: "product",
      product_id: 2
    }];

    this.setState({
      coupons
    });
  }

  render() {
    const body = this.getBody();

    return (
      <div>{ body }</div>
    );
  }

  getBody = () => {
    const coupons = this.getCoupons();

    return <div className = "container">
             <div className = "row"><UndoRedo/></div>
             <div className = "row">
               <div className = "col-md-12">
                 <ProductList dataUrl = "https://next.json-generator.com/api/json/get/Ekhd3qgtH"/>
               </div>
             </div>
             <Cart/>
             <div className = "coupons">{ coupons }</div>
           </div>
  }

  // Coupons
  getCoupons = () => {
    const { coupons } = this.state;
    const result = coupons.map((coupon) => {
      return <Coupon key = { coupon.id } item = { coupon }/>;
    });

    return result;
  }

}

export default Shop;