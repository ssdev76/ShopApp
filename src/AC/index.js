import {ADD_CART_ITEM, DELETE_CART_ITEM, CHANGE_CART_ITEM_COUNT, ADD_CART_COUPON, DELETE_CART_COUPONS } from '../constants';

export function addItemToCart(item) {
  return {
    type: ADD_CART_ITEM,
    payload: {item}
  }
}

export function deleteCartItem(id) {
  return {
    type: DELETE_CART_ITEM,
    payload: {id}
  }
}

export function changeCartItemCount(id, ev) {
  const newValue = ev && ev.target && ev.target.value || 0;

  return {
    type: CHANGE_CART_ITEM_COUNT,
    payload: {id, newValue}
  }
}

export function applyCoupon(coupon) {
  return {
    type: ADD_CART_COUPON,
    payload: {coupon}
  }
}

export function deleteCoupons(ids) {
  return {
    type: DELETE_CART_COUPONS,
    payload: {ids}
  }
}