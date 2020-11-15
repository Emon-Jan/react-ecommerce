import { Button, Card, Divider, Input, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { Component } from "react";
import { getDiscountedPrice } from "../../utils/helper";
import "./shoppingcart.css";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Icon, { DeleteFilled } from "@ant-design/icons";
import CircleIcon from "../../icons/CircleIcon";
import RadioButtonIcon from "../../icons/RadioButtonIcon";
import BdtIcon from "../../icons/BdtIcon";

const ICON_STYLE = {
  fontSize: 12,
  color: "#616161",
};

class ShoppingCart extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const {
      subTotalPrice,
      totalItems,
      totalShippingCharge,
      promoDiscountRate,
    } = this.props.orderSummary;

    const totalPayablePrice = getDiscountedPrice(
      totalShippingCharge + subTotalPrice,
      promoDiscountRate
    );

    const cartItems = () => {
      return this.props.cart.map((cartObj, index) => {
        const {
          title,
          originalPrice,
          color,
          shippingCharge,
          size,
          discount,
          avatar,
        } = cartObj.product;

        const discountedPrice = getDiscountedPrice(originalPrice, discount);
        const totalPrice = discountedPrice + shippingCharge;

        return (
          <div key={index}>
            <Card className="inner-card" bordered={true}>
              <DeleteFilled
                className="delete-button"
                onClick={() => this.props.onDeleteFromCart(cartObj)}
              />
              <div className="inner-card-div">
                <div className="inner-card-div-first">
                  <div>
                    <Avatar shape="square" size={75} src={avatar} />
                  </div>
                  <div className="inner-div-container">
                    <div className="inner-div-first_title">{title}</div>
                    <div className="inner-div-first_body">
                      <Space size={20}>
                        <span>Color: {color}</span>
                        <span>Size: {size}</span>
                      </Space>
                    </div>
                    <div>
                      <span>Total Price: BDT. {discountedPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="inner-card-div-second">
                  <div>
                    <span>Shipping Method: EMS</span>
                  </div>
                  <div>
                    <span>Shipping Charge: {shippingCharge}</span>
                  </div>
                </div>
                <div className="inner-card-div-third">
                  <div className="quantity-div-wrapper">
                    <div>
                      <span>Quantity</span>
                    </div>
                    <div className="quantity-button-container">
                      <div className="quantity-button-one">
                        <PlusOutlined
                          style={ICON_STYLE}
                          onClick={() =>
                            this.props.addToCart(cartObj.product, 1)
                          }
                        />
                      </div>
                      <div className="quantity-button-two">
                        <span>{cartObj.quantity}</span>
                      </div>
                      <div className="quantity-button-three">
                        <MinusOutlined
                          style={ICON_STYLE}
                          onClick={() => {
                            this.props.removeFromCart(cartObj.product, -1);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span>{`Total Price: ${totalPrice}`}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      });
    };

    return (
      <div className="cart-container">
        <div className="cart-section-top-div">
          <Button
            className="cart-section-button"
            type="text"
            onClick={() => this.props.history.goBack()}
          >
            Go Back
          </Button>
        </div>
        <div className="cart-section-bottom-div">
          <Card className="main-card-container">
            {cartItems()}
            {!!this.props.cart.length && (
              <div className="checkout-button-div">
                <div className="check-radio-button">
                  {this.props.termsChecked ? (
                    <Icon
                      component={RadioButtonIcon}
                      className="check-icon-checked"
                    />
                  ) : (
                    <Icon
                      component={CircleIcon}
                      className={
                        this.props.checkError ? "check-error" : "check-icon"
                      }
                      onClick={this.props.handleRadioChange}
                    />
                  )}
                  {!!this.props.checkError && (
                    <span className="warning-mes-radio">
                      You must agree to the terms & conditions
                    </span>
                  )}
                  <span>
                    I Agree to the Terms and Conditions, Privacy Policy & Refund
                    Policy
                  </span>
                </div>
                <Button
                  className="checkout-button"
                  onClick={() => this.props.onCheckout(totalPayablePrice)}
                >
                  Checkout
                </Button>
              </div>
            )}
          </Card>
          <Card className="right-card-container" title="ORDER SUMMARY">
            <div className="right-card-container-div">
              <div className="right-div">
                <span>{`Subtotal (${totalItems || 0} items)`}</span>
                <span>
                  <Icon component={BdtIcon} />
                  {subTotalPrice || 0}
                </span>
              </div>
              <div className="right-div">
                <span>Discount</span>
                <span>{promoDiscountRate || 0}%</span>
              </div>
              <div className="right-div">
                <span>Shipping Charge</span>
                <span>
                  <Icon component={BdtIcon} />
                  {totalShippingCharge || 0}
                </span>
              </div>
              <div className="right-div">
                <span>Wallet Debit</span>
                <span>
                  <Icon component={BdtIcon} />
                  {0}
                </span>
              </div>
              <Divider dashed className="divider" />
              <div className="code-input-filed">
                <Input
                  className={
                    !!this.props.promoError
                      ? "text-input-filed-error"
                      : "text-input-filed"
                  }
                  placeholder="Apply code here"
                  allowClear
                  name="promoCode"
                  value={this.props.promoCode}
                  onChange={this.props.handlePromoCodeChange}
                />
                <button onClick={this.props.applyPromoCode}>Apply</button>
                {!!this.props.promoError && (
                  <span className="error">{this.props.promoError}</span>
                )}
              </div>
              <Divider dashed className="divider" />
              <div className="right-div">
                <span>Total Payable</span>
                <span>
                  <Icon component={BdtIcon} />
                  {totalPayablePrice || 0}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
