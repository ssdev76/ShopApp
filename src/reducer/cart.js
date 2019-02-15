import { ADD_CART_ITEM, DELETE_CART_ITEM, CHANGE_CART_ITEM_COUNT, ADD_CART_COUPON, DELETE_CART_COUPONS } from '../constants';

export default (cart = {items: [], coupons: []}, action) => {
  const {type, payload} = action;

  switch (type) {
    case ADD_CART_ITEM: {
      const newItems = addItemToCart(cart.items, payload.item);

      return Object.assign({}, cart, {items: newItems});
    }
    case DELETE_CART_ITEM: {
      const newCartItems = deleteCartItem(cart.items, payload.id);
      const newCartCoupons = (newCartItems.length === 0) ? [] : deleteCouponsByProductsId(cart, [payload.id]);

      return Object.assign({}, cart, {items: newCartItems, coupons: newCartCoupons});
    }
    case CHANGE_CART_ITEM_COUNT: {
      const newItems = changeCartItemCount(cart.items, payload.id, payload.newValue);

      return Object.assign({}, cart, {items: newItems});
    }
    case ADD_CART_COUPON: {
      const newCartCoupons = applyCoupon(cart, payload.coupon);
      const newCartItems = applyCouponsToCartItems(cart.items, newCartCoupons);

      return Object.assign({}, cart, {coupons: newCartCoupons, items: newCartItems});
    }
    case DELETE_CART_COUPONS: {
      const newCartCoupons = deleteCouponsById(cart, payload.ids);
      const newCartItems = applyCouponsToCartItems(cart.items, newCartCoupons); 

      return Object.assign({}, cart, {coupons: newCartCoupons, items: newCartItems});
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
  let addItem = {...item};
  const cartItems = [...items];
  const cartItemIndex = cartItems.findIndex(cartItem => cartItem.id === addItem.id);

  (cartItemIndex === -1) ? (
    addItem.count = 1,
    cartItems.push(addItem)
  ) : (
    addItem = {...cartItems[cartItemIndex]},
    addItem.count++,
    cartItems[cartItemIndex] = addItem
  );

  return cartItems;
}

/**
  * Delete product from cart by product id
  *
  * @param {Object} cart - cart
  * @param {Number} id - product id that must be deleted from cart
  * @returns {Object}
  */

const deleteCartItem = (items, id) => [...items].filter(item => item.id !== id);

/**
  * Change product count in cart
  *
  * @param {Array} items - products in cart
  * @param {Number} id - product id that must be modified in cart
  * @returns {Array}
  */

const changeCartItemCount = (items, id, newValue) => [...items].map(item => {
  if (item.id !== id) {
    return item;
  }

  const updItem = {...item};

  updItem.count = 1 * newValue;
  return updItem;
});

/**
  * Add coupon to cart
  *
  * @param {Object} cart - cart
  * @param {Object} coupon - coupon that must be added in cart
  * @returns {Array}
  */

const applyCoupon = (cart, coupon) => 
  (cart.coupons.findIndex(cartCoupon => cartCoupon.id === coupon.id) === -1 && cart.items.length > 0) ?
  [...cart.coupons].concat({...coupon}) :
  [...cart.coupons];

/**
  * Delete coupons from cart by array of coupon's ids
  *
  * @param {Object} cart - cart
  * @param {Array} ids - product's ids that must be deleted from cart
  * @returns {Array}
  */

const deleteCouponsById = (cart, ids) => [...cart.coupons].filter(coupon => ids.indexOf(coupon.id) === -1);

/**
  * Delete coupons from cart by array of product's ids
  *
  * @param {Object} cart - cart
  * @param {Array} ids - product's ids that must be deleted from cart
  * @returns {Array}
  */

const deleteCouponsByProductsId = (cart, productIds) => [...cart.coupons].filter(coupon => productIds.indexOf(coupon.product_id) === -1);

/**
  * Apply coupons to items of cart
  *
  * @param {Array} cartItems - items of cart
  * @param {Object} cartCoupons - applied coupons
  * @returns {Array}
  */

const applyCouponsToCartItems = (cartItems, cartCoupons) => 
  [...cartItems].map(item => {
    let sale = 0;
    let coupons = [];
    const cartItem = {...item};

    [...cartCoupons].forEach(coupon => {
      sale += 1 * ((coupon.type === "cart" || coupon.product_id === item.id) && coupon.percent);
      (coupon.product_id === item.id) && coupons.push({...coupon});
    });

    cartItem.sale = (sale >= 100) ? 100 : sale;
    cartItem.coupons = coupons;

    return cartItem;
  });