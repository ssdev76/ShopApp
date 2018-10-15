import { ADD_CART_ITEM, DELETE_CART_ITEM, CHANGE_CART_ITEM_COUNT, ADD_CART_COUPON, DELETE_CART_COUPONS } from '../constants';

export default (cart = {items: [], coupons: []}, action) => {
  const {type, payload} = action;

  switch (type) {
    case ADD_CART_ITEM: {
      const newItems = addItemToCart(cart.items, payload.item);

      return Object.assign({}, cart, {items: newItems});
    }
    case DELETE_CART_ITEM: {
      const newCart = deleteCartItem(cart, payload.id);

      return Object.assign({}, newCart);
    }
    case CHANGE_CART_ITEM_COUNT: {
      const newItems = changeCartItemCount(cart.items, payload.id, payload.newValue);

      return Object.assign({}, cart, {items: newItems});
    }
    case ADD_CART_COUPON: {
      const newCartCoupons = applyCoupon(cart, payload.coupon);

      return Object.assign({}, cart, {coupons: newCartCoupons});
    }
    case DELETE_CART_COUPONS: {
      const newCartCoupons = deleteCoupons(cart, payload.ids);

      return Object.assign({}, cart, {coupons: newCartCoupons});
    }
  }

  return cart;
}

/**
  * Add product to cart
  *
  * @param {Array} items - products in cart
  * @param {Object} item - product that must be added to cart
  * @returns {Array}
  */

const addItemToCart = (items, item) => {
  const cartItems = (items || []).slice(),
        cartItemsCount = cartItems.length,
        addItem = Object.assign({}, item);
  let checkAdd = true;

  //Check existing of product in cart
  for (let j = 0; j < cartItemsCount; j++) {
    if (addItem.id === cartItems[j].id) {
      const updCartItem = Object.assign({}, cartItems[j]);
      updCartItem.count++;
      cartItems[j] = updCartItem;
      checkAdd = false;

      break;
    }
  }

  if (checkAdd && addItem) {
    addItem.count = 1;
    cartItems.push(addItem);
  }

  return cartItems;
}

/**
  * Delete product from cart by product id
  *
  * @param {Object} cart - cart
  * @param {Number} id - product id that must be deleted from cart
  * @returns {Object}
  */

const deleteCartItem = (cart, id) => {
  if (id !== 0 && !id) {
    return cart;
  }

  let newCart = Object.assign({}, cart);
  const cartItems = (newCart.items || []).slice();

  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];

    if (item.id === id) {
      cartItems.splice(i, 1);

      if (item.coupons && item.coupons.length > 0) {
        let couponIds = [];

        item.coupons.forEach((coupon) => {
          return couponIds.push(coupon.id);
        });

        const newCartCoupons = deleteCoupons(cart, couponIds);
        newCart = Object.assign({}, newCart, {coupons: newCartCoupons});
      }

      return Object.assign({}, newCart, {items: cartItems});
    }
  }

  return cart;
}

/**
  * Change product count in cart
  *
  * @param {Array} items - products in cart
  * @param {Number} id - product id that must be modified in cart
  * @returns {Array}
  */

const changeCartItemCount = (items, id, newValue) => {
  if ((!id && id !== 0) || (!newValue && newValue !== 0)) {
    return;
  }

  const cartItems = (items || []).slice();

  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];

    if (item.id === id) {
      const updCartItem = Object.assign({}, cartItems[i]);
      updCartItem.count = 1 * newValue;
      cartItems[i] = updCartItem;
    }
  }

  return cartItems;
}

/**
  * Add coupon to cart
  *
  * @param {Object} cart - cart
  * @param {Object} coupon - coupon that must be added in cart
  * @returns {Array}
  */

const applyCoupon = (cart, coupon) => {
  const couponType = (coupon && coupon.type) || "",
        cartCoupons = (cart.coupons || []).slice(),
        cartCouponsCount = cartCoupons.length;

  for (let i = 0; i < cartCouponsCount; i++) {
    if (cartCoupons[i].id === coupon.id) {
      return cartCoupons;
    }
  }

  cartCoupons.push(Object.assign({}, coupon));

  return cartCoupons;
}

/**
  * Delete coupons from cart by array of product's ids
  *
  * @param {Object} cart - cart
  * @param {Array} ids - product's ids that must be deleted from cart
  * @returns {Object}
  */

function deleteCoupons(cart, ids) {
  const cartCoupons = (cart.coupons || []).slice();
  const updCartCoupons = cartCoupons.filter(coupon => ids.indexOf(coupon.id) === -1);

  return updCartCoupons.slice();
}