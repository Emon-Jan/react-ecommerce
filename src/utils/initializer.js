export const productInitalState = {
  _id: "",
  title: "",
  originalPrice: "",
  discount: "",
  shippingCharge: "",
  color: "",
  size: "",
  active: false,
  avatar: null,
};

export const promoInitalState = {
  _id: "",
  title: "",
  active: false,
  discountRate: "",
  startDate: "",
  endDate: "",
  useTime: "",
  usage: "",
};

export const orderSummaryInitialState = {
  totalItems: null,
  subTotalPrice: null,
  totalShippingCharge: null,
  promoDiscountRate: null,
};

export const loggedInUserInitalState = {
  userId: "",
  role: "",
};
