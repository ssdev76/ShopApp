import { ADD_CART_ITEM, DELETE_CART_ITEM, CHANGE_CART_ITEM_COUNT, ADD_CART_COUPON, DELETE_CART_COUPONS } from '../constants';

export default (cart = {items: [], coupons: []}, action) => {
  const {type, payload} = action;

  switch (type) {
    case ADD_CART_ITEM: {
      const newItems = addItemToCart(cart.items, payload.item);

      return Object.assign({}, cart, {items: newItems});
    }
    case DELETE_CART_ITEM: {
      const newCartItems = deleteCartItem(cart, payload.id);
      const newCartCoupons = (newCartItems.length === 0) ? [] : deleteCouponsByProductsId(cart, [payload.id]);

      return Object.assign({}, cart, {items: newCartItems, coupons: newCartCoupons});
    }
    case CHANGE_CART_ITEM_COUNT: {
      const newItems = changeCartItemCount(cart.items, payload.id, payload.newValue);

      return Object.assign({}, cart, {items: newItems});
    }
    case ADD_CART_COUPON: {
      const newCartCoupons = applyCoupon(cart, payload.coupon);
      const newCartItems = applyCouponsToCartItems([...cart.items], newCartCoupons);

      return Object.assign({}, cart, {coupons: newCartCoupons, items: newCartItems});
    }
    case DELETE_CART_COUPONS: {
      const newCartCoupons = deleteCouponsById(cart, payload.ids);
      const newCartItems = applyCouponsToCartItems([...cart.items], newCartCoupons); 

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
  const cartItems = [...items],
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

  const cartItems = [...cart.items];
  const cartItemsCount = cartItems.length;

  for (let i = 0; i < cartItemsCount; i++) {
    let item = cartItems[i];

    if (item.id === id) {
      cartItems.splice(i, 1);

      return cartItems;
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
    return items;
  }

  const cartItems = [...items];

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
        cartCoupons = [...cart.coupons],
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
  * Delete coupons from cart by array of coupon's ids
  *
  * @param {Object} cart - cart
  * @param {Array} ids - product's ids that must be deleted from cart
  * @returns {Array}
  */

const deleteCouponsById = (cart, ids) => {
  const cartCoupons = [...cart.coupons],
        cartItems = [...cart.items];
  return cartCoupons.filter(coupon => ids.indexOf(coupon.id) === -1);
}

/**
  * Delete coupons from cart by array of product's ids
  *
  * @param {Object} cart - cart
  * @param {Array} ids - product's ids that must be deleted from cart
  * @returns {Array}
  */

const deleteCouponsByProductsId = (cart, ids) => {
  const cartCoupons = [...cart.coupons],
        cartItems = [...cart.items];
  return cartCoupons.filter(coupon => ids.indexOf(coupon.product_id) === -1);
}

/**
  * Apply coupons to items of cart
  *
  * @param {Array} cartItems - items of cart
  * @param {Object} cartCoupons - applied coupons
  * @returns {Array}
  */

const applyCouponsToCartItems = (cartItems, cartCoupons) => {
  if (!cartCoupons) {
    return cartItems;
  }

  return cartItems.map(item => {
    item.sale = 0;
    item.coupons = [];
    
    cartCoupons.forEach(coupon => {
        if (coupon.type === "cart" || coupon.product_id == item.id) {
        item.sale += 1 * coupon.percent;
    
        if (coupon.product_id == item.id) {
            item.coupons.push(coupon);
        }
    
        if (item.sale >= 100) {
            return item.sale = 100;
        }
        }
    
        return item.sale;
    });
    
    return item;
  });
}