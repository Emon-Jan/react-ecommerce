import React from "react";
import { Button, Card, DatePicker, Input, Switch } from "antd";
import "./admin-add-promo-form.css";
import moment from "moment";
import { authAdmin } from "../../../../services/auth";
import MessageModal from "../../../modal/message-modal";

import { CheckCircleFilled } from "@ant-design/icons";

const AdminPromoAddForm = (props) => {
  if (!authAdmin()) {
    props.history.replace("/admin/login");
  }

  return (
    <div className="product-container">
      <div className="product-section-bottom-form">
        <Card className="addform-card-container">
          <form>
            <div className="addform-form-input-label">
              <label htmlFor="title">
                Promo Code
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={props.promocodeData.title}
                  onChange={props.handlePromocodeTitleChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="startDate">
                Start Date
                {props.promocodeData.startDate === "" ? (
                  <DatePicker
                    className="date-input-field"
                    id="startDate"
                    onChange={props.handleStartDateChange}
                  />
                ) : (
                  <DatePicker
                    className="date-input-field"
                    id="startDate"
                    name="startDate"
                    defaultValue={moment(props.promocodeData.startDate)}
                    onChange={props.handleStartDateChange}
                  />
                )}
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="endDate">
                End Date
                {props.promocodeData.endDate === "" ? (
                  <DatePicker
                    className="date-input-field"
                    id="endDate"
                    onChange={props.handleEndDateChange}
                  />
                ) : (
                  <DatePicker
                    className="date-input-field"
                    id="endDate"
                    name="endDate"
                    defaultValue={moment(props.promocodeData.endDate)}
                    onChange={props.handleEndDateChange}
                  />
                )}
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="discount">
                Discount Rate
                <Input
                  type="text"
                  id="discount"
                  name="discount"
                  value={props.promocodeData.discountRate}
                  onChange={props.handlePromoDiscountChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="useTime">
                Use Time
                <Input
                  type="text"
                  id="useTime"
                  name="useTime"
                  value={props.promocodeData.useTime}
                  onChange={props.handlePromoUseTimeChange}
                />
              </label>
            </div>
            <div className="addform-form-input-label">
              <label htmlFor="active">Active</label>
              <Switch
                className="active-switch"
                checked={props.promocodeData.active}
                onChange={props.onPromocodeActiveChange}
              />
            </div>
            <div className="form-button-section">
              {props.isEditPromocode ? (
                <React.Fragment>
                  <Button
                    className="promo-update-button"
                    onClick={props.updatePromocode}
                  >
                    Update
                  </Button>
                  <Button
                    className="promo-cancel-button"
                    onClick={props.cancelUpdatePromocode}
                  >
                    Cancel
                  </Button>
                </React.Fragment>
              ) : (
                <Button
                  className="promo-add-button"
                  onClick={props.addPromocode}
                >
                  Add
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
      <MessageModal
        isModalOpen={props.isPromocodeModalOpen}
        width={200}
        top={150}
        left={125}
        onCancel={props.onCancelPromoModal}
      >
        <div className="signup-modal-mes-div">
          <CheckCircleFilled style={{ fontSize: 25 }} />
          <span className="signup-modal-span-top">Your Promocode Added</span>
          <span className="signup-modal-span-top">Successfully</span>
        </div>
      </MessageModal>
    </div>
  );
};

export default AdminPromoAddForm;
