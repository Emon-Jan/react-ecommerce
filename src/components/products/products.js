import React, { Component } from "react";
import "./products.css";
import axios from "axios";
import Product from "./product/product";
import api from "../../utils/api-url";

class Products extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { data: products } = await axios.get(api.PRODUCT_GET_URL);
    this.props.setProductsToState(products);
  }

  render() {
    const { products, searchText, addToCart } = this.props;

    const productsContainer = products
      .filter((product) => {
        return searchText
          ? product.title.toLowerCase().includes(searchText.toLowerCase()) ||
              product.originalPrice
                .toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())
          : product;
      })
      .map((product, index) => {
        if (product.active) {
          return (
            <Product key={index} product={product} addToCart={addToCart} />
          );
        }
        return null;
      });
    return (
      <div className="product-container">
        <div className="product-section-bottom-div">{productsContainer}</div>
      </div>
    );
  }
}
export default Products;
