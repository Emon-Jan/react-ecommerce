import { Button, Card } from "antd";
import React, { useState } from "react";

function AdminProduct({ product, editProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  const productCard = () => {
    return (
      <div
        className="admin-parent-div"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          cover={
            <img className="card-image" alt="example" src={product.avatar} />
          }
          className={
            isHovered
              ? "admin-card-container-hover"
              : "admin-product-card-container"
          }
        >
          <div className="admin-card-div-container">
            <p>{product.title}</p>
            <div className="card-footer">
              <span className="card-span-left">{`BDT. ${product.originalPrice}`}</span>
              <span className="card-span-right">{`${product.discount}%`}</span>
            </div>
          </div>
        </Card>
        {isHovered && (
          <Button
            className="admin-card-button-hover"
            onClick={() => editProduct(product)}
          >
            Edit
          </Button>
        )}
      </div>
    );
  };

  return productCard();
}

export default AdminProduct;
