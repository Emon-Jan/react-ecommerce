import moment from "moment";

export const getDiscountedPrice = (price, dis) => {
  return Math.ceil(price - (price * dis) / 100);
};

export const dateFormat = (date, format) => {
  return moment(date).format(format);
};
