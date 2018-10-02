import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { applyCoupon } from '../../AC';
import './coupon.css';

const Coupon = (props) => {
  const { item, applyCoupon } = props;

  return (
    <div className = "coupon">
      <h3>{ item.title }</h3>
      <div>{ item.percent }%</div>
      <button 
        className = "btn btn-primary"
        onClick = { applyCoupon.bind(this, item) }
      >Apply</button>
    </div>
  );  
}

Coupon.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    percent: PropTypes.number,
    type: PropTypes.string
  }),
  applyCoupon: PropTypes.func
}

export default connect(null, {applyCoupon})(Coupon);