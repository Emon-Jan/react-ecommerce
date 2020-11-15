import { Button, Card } from "antd";
import React, { useState } from "react";

function Product({ product, addToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  const productCard = () => {
    if (isHovered) {
      return (
        <Card className="card-container-hover">
          <Button
            className="card-button-hover"
            type="text"
            onClick={() => addToCart(product, 1)}
          >
            Add To Cart
          </Button>
        </Card>
      );
    }
    return (
      <Card
        cover={
          <img className="card-image" alt="example" src={product.avatar} />
        }
        className="card-container"
      >
        <div className="card-div-container">
          <p>{product.title}</p>
          <div className="card-footer">
            <span className="card-span-left">{`BDT. ${product.originalPrice}`}</span>
            <span className="card-span-right">{`${product.discount}%`}</span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {productCard()}
    </div>
  );
}

export default Product;
