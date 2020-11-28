import React, { useEffect } from "react";
import { Button, Card, Input, Progress, Switch } from "antd";
import { authAdmin } from "../../../../services/auth";
import MessageModal from "../../../modal/message-modal";

import { CheckCircleFilled } from "@ant-design/icons";

const AdminProductForm = (props) => {
  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      props.resetProductForm();
    };
  }, []);

  if (!authAdmin()) {
    props.history.replace("/admin/login");
  }
  let upload = React.createRef();

  return (
    <div className="product-container">
      <div className="product-section-bottom-form">
        <Card className="addform-card-container">
          <form>
            <div className="addform-form-input-label">
              <input
                type="file"
                ref={(el) => (upload = el)}
                style={{ display: "none" }}
                onChange={props.handleImageUploadChange}
              />
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  upload.click();
                }}
              >
                {!props.product.avatar ? (
                  <div className="avatar-uploader">
                    <div style={{ marginTop: 8 }}>Upload</div>
                    <div style={{ marginTop: 8 }}>Product Image</div>
                  </div>
                ) : (
                  <div className="avatar-uploader-blank">
                    <img
                      className={
                        props.progress !== 100 && !props.isEditProduct
                          ? "product-img__blur "
                          : "product-img"
                      }
                      src={props.product.avatar}
                      alt="avatar"
                    />
                    {!!props.progress && (
                      <Progress
                        type="line"
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        showInfo={true}
                        percent={props.progress}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="title">
                Product Name
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={props.product.title}
                  onChange={props.handleProductTitleChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="originalPrice">
                Product price (Before Discount)
                <Input
                  type="text"
                  id="originalPrice"
                  name="originalPrice"
                  value={props.product.originalPrice}
                  onChange={props.handlePriceChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="discount">
                Discount Rate
                <Input
                  type="text"
                  id="discount"
                  name="discount"
                  value={props.product.discount}
                  onChange={props.handleDiscountChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="shippingCharge">
                Shipping Charge
                <Input
                  type="text"
                  id="shippingCharge"
                  name="shippingCharge"
                  value={props.product.shippingCharge}
                  onChange={props.handleShippingChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="color">
                Color
                <Input
                  type="text"
                  id="color"
                  name="color"
                  value={props.product.color}
                  onChange={props.handleColorChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="size">
                Size
                <Input
                  type="text"
                  id="size"
                  name="size"
                  value={props.product.size}
                  onChange={props.handleSizeChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="active">Active</label>
              <Switch
                className="active-switch"
                checked={props.product.active}
                onChange={props.onProductActiveChange}
              />
            </div>
            <div className="form-button-section">
              {props.isEditProduct ? (
                <React.Fragment>
                  <Button
                    className="promo-update-button"
                    onClick={props.onUpdateProduct}
                  >
                    Update
                  </Button>
                  <Button
                    className="promo-cancel-button"
                    onClick={props.onCancelUpdateProduct}
                  >
                    Cancel
                  </Button>
                </React.Fragment>
              ) : (
                <Button className="promo-add-button" onClick={props.addProduct}>
                  Add
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
      <MessageModal
        isModalOpen={props.isProductModalOpen}
        width={200}
        top={150}
        left={125}
        onCancel={props.onCancelProductModal}
      >
        <div className="signup-modal-mes-div">
          <CheckCircleFilled style={{ fontSize: 25 }} />
          <span className="signup-modal-span-top">Your Product Added</span>
          <span className="signup-modal-span-top">Successfully</span>
        </div>
      </MessageModal>
    </div>
  );
};

export default AdminProductForm;
