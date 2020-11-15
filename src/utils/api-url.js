/* eslint-disable import/no-anonymous-default-export */
const HOST = process.env.REACT_APP_SERVER;

const urlConfig = {
  LOGIN_POST_URL: `${HOST}/api/v1/admin/login`,
  ADDPRODUCT_POST_URL: `${HOST}/api/v1/admin/product`,
  CHECKOUT_POST_URL: `${HOST}/api/v1/order`,
  APPLYPROMO_POST_URL: `${HOST}/api/v1/apply-promocode`,
  SIGNUP_POST_URL: `${HOST}/api/v1/user/signup`,
  ADDPROMO_POST_URL: `${HOST}/api/v1/admin/promocode`,
  ORDERSTATUS_PATCH_URL: `${HOST}/api/v1/admin/order/`,
  PROMOACTIVE_PATCH_URL: `${HOST}/api/v1/admin/promocode/`,
  UPDATEPROMO_PUT_URL: `${HOST}/api/v1/admin/promocode/edit/`,
  ADMIN_ORDER_GET_URL: `${HOST}/api/v1/admin/orders`,
  ADMIN_PRODUCTS_GET_URL: `${HOST}/api/v1/admin/products`,
  UPDATEPRODUCT_PUT_URL: `${HOST}/api/v1/admin/product/edit/`,
  ADMIN_PROMO_GET_URL: `${HOST}/api/v1/admin/promocodes`,
  PRODUCT_GET_URL: `${HOST}/api/v1/products`,
};

export default { ...urlConfig };
