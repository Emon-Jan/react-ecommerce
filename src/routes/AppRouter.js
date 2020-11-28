import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminLogin from "../components/admin/admin-login/admin-login";
import AdminProducts from "../components/admin/admin-products/admin-products";
import Products from "../components/products/products";
import ShoppingCart from "../components/shoppingcart/shoppingcart";
import AdminPromoCodes from "../components/admin/admin-promocodes/admin-promocodes";
import AdminOrders from "../components/admin/admin-orders/admin-orders";
import AdminPanel from "../components/admin/admin-panel/admin-panel";
import UserLogin from "../components/user-signup/user-signup";
import AdminPromoAddForm from "../components/admin/admin-promocodes/admin-add-promo-form/admin-add-promo-form";
import AdminProductForm from "../components/admin/admin-products/admin-product-form/admin-product-form";

class AppRouter extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const {
      productProps,
      cartProps,
      loginProps,
      adminLoginProps,
      adminProductProps,
      adminOrderProps,
      adminPromoProps,
    } = this.props;
    return (
      <Switch>
        <Route
          path="/products"
          render={(p) => <Products {...p} {...productProps} />}
        />
        <Route
          path="/cart"
          render={(p) => <ShoppingCart {...p} {...cartProps} />}
        />
        <Route
          path="/login"
          render={(p) => <UserLogin {...p} {...loginProps} />}
        />
        <Route
          path="/admin/login"
          render={(p) => <AdminLogin {...p} {...adminLoginProps} />}
        />
        <Route
          path="/admin/admin-panel"
          render={(p) => <AdminPanel {...p} />}
        />
        <Route
          path="/admin/products"
          render={(p) => <AdminProducts {...p} {...adminProductProps} />}
        />
        <Route
          path="/admin/add-product"
          render={(p) => <AdminProductForm {...p} {...adminProductProps} />}
        />
        <Route
          path="/admin/edit-product"
          render={(p) => <AdminProductForm {...p} {...adminProductProps} />}
        />
        <Route
          path="/admin/orders"
          render={(p) => <AdminOrders {...p} {...adminOrderProps} />}
        />
        <Route
          path="/admin/promocodes"
          render={(p) => <AdminPromoCodes {...p} {...adminPromoProps} />}
        />
        <Route
          path="/admin/add-promocode"
          render={(p) => <AdminPromoAddForm {...p} {...adminPromoProps} />}
        />
        <Route
          path="/admin/edit-promocode"
          render={(p) => <AdminPromoAddForm {...p} {...adminPromoProps} />}
        />
        <Redirect from="/" to="/products" />
      </Switch>
    );
  }
}

export default AppRouter;
