import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loadProducts } from '../../AC';
import Product from './Product';
import Loader from '../loader/Loader';
import './products.css';

class ProductList extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    loadProducts: PropTypes.func,
    dataUrl: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    errorMessage: PropTypes.string
  }

  componentDidMount() {
    const { dataUrl, loading, loaded, loadProducts } = this.props;

    if (loaded && !loading) {
        return;
    }

    loadProducts(dataUrl);
  }

  render() {
    const body = this.getBody();

    return <div>{ body }</div>;
  }

  getBody = () => {
    const { products, loading, loaded, errorMessage } = this.props;

    if (loading || loaded && errorMessage) {
        return <Loader errorMessage = { errorMessage }/>;
    }

    if (!products || products.length === 0) {
        return;
    }

    const productItems = products.map(item => <li key = { item.id }><Product item = { item }/></li>);

    return <ul>{ productItems }</ul>;
  }
}

export default connect((state) => ({
  products: state.productsState.products,
  loading: state.productsState.loading,
  loaded: state.productsState.loaded,
  errorMessage: state.productsState.errorMessage
}), { loadProducts })(ProductList);