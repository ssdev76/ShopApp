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
    products: [],
    coupons: []
  }

  componentDidMount() {
    fetch("https://next.json-generator.com/api/json/get/Ekhd3qgtH")
      .then(res => res.json())
      .then(
        (result) => {
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
            isLoaded: true,
            products: result,
            coupons
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const body = this.getBody();

    return (
      <div>{ body }</div>
    );
  }

  getBody = () => {
    const coupons = this.getCoupons();
    const { products, isLoaded, error } = this.state;
    let body = <div id = "loader">
                 <div className = "dot"></div>
                 <div className = "lading"></div>
               </div>

    if (isLoaded) {
      body = (error) ? 
                <div className = "error">
                  <i className = "glyphicon glyphicon-warning-sign"></i>
                  { error.message }
                </div>
             :  <div>
                  <div className = "container">
                    <div className = "row"><UndoRedo/></div>
                    <div className = "row">
                      <div className = "col-md-12">
                        <ProductList items = { products }/>
                      </div>
                    </div>
                    <Cart/>
                    <div className = "coupons">{ coupons }</div>
                  </div>
                </div>
    }

    return body;
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