import React, { Component } from "react";

import { Button } from "antd";
import axios from "axios";
import api from "../../../utils/api-url";
import "./admin-products.css";
import { authAdmin, getToken } from "../../../services/auth";
import AdminProduct from "./admin-product/admin-product";

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.upload = React.createRef();
  }

  async componentDidMount() {
    if (!authAdmin()) {
      this.props.history.replace("/admin/login");
    }
    const token = getToken();
    const config = {
      headers: { "x-autentication-token": `bearer ${token}` },
    };
    const { data: products } = await axios.get(
      api.ADMIN_PRODUCTS_GET_URL,
      config
    );
    this.props.setProductsToState(products);
  }

  render() {
    const { products, onEditProduct } = this.props;

    const productList = products.map((product, index) => (
      <AdminProduct key={index} product={product} editProduct={onEditProduct} />
    ));

    return (
      <div className="admin-product-container">
        <div className="admin-product-section-top-div">
          <Button
            className="admin-product-section-button"
            type="text"
            onClick={() => this.props.history.push("/admin/add-product")}
          >
            Add New Product
          </Button>
        </div>
        <div className="admin-product-section-bottom-div">{productList}</div>
      </div>
    );
  }
}

export default AdminProducts;
