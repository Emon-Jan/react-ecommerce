import React, { Component } from "react";
import axios from "axios";
import api from "../../../utils/api-url";
import "./admin-orders.css";
import { Button, Space } from "antd";
import { authAdmin, getToken } from "../../../services/auth";

import Fade from "react-reveal/Fade";

const ORDER_STATUS_TYPES = {
  ALL: "all",
  PENDING: "pending",
  CANCEL: "cancel",
  CONFIRM: "confirm",
};

class AdminOrders extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (!authAdmin()) {
      this.props.history.replace("/admin/login");
    }
    const token = getToken();
    const config = {
      headers: { "x-autentication-token": `bearer ${token}` },
    };
    const { data: orders } = await axios.get(api.ADMIN_ORDER_GET_URL, config);
    this.props.setOrdersToState(orders);
  }

  render() {
    const tableRow = (order, index) => (
      <Fade>
        <tr className="table-row-div" key={index}>
          <td>{index + 1}</td>
          <td>{order.orderId}</td>
          <td>{order.totalPrice}</td>
          <td>
            <div className="order-button-group">
              {order.status === ORDER_STATUS_TYPES.PENDING && (
                <Space>
                  <Button
                    className={"order-confirm-button"}
                    onClick={() =>
                      this.props.setStatus(
                        order,
                        index,
                        ORDER_STATUS_TYPES.CONFIRM
                      )
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    className="order-cancel-button"
                    onClick={() =>
                      this.props.setStatus(
                        order,
                        index,
                        ORDER_STATUS_TYPES.CANCEL
                      )
                    }
                  >
                    Cancel
                  </Button>
                </Space>
              )}
            </div>
          </td>
          <td>
            <span>{order.status}</span>
          </td>
        </tr>
      </Fade>
    );

    const tableBody = this.props.orders.map((order, index) => {
      if (
        this.props.orderStatusType === ORDER_STATUS_TYPES.PENDING &&
        order.status === ORDER_STATUS_TYPES.PENDING
      ) {
        return tableRow(order, index);
      } else if (
        this.props.orderStatusType === ORDER_STATUS_TYPES.CONFIRM &&
        order.status === ORDER_STATUS_TYPES.CONFIRM
      ) {
        return tableRow(order, index);
      } else if (
        this.props.orderStatusType === ORDER_STATUS_TYPES.CANCEL &&
        order.status === ORDER_STATUS_TYPES.CANCEL
      ) {
        return tableRow(order, index);
      } else if (this.props.orderStatusType === ORDER_STATUS_TYPES.ALL) {
        return tableRow(order, index);
      }
      return null;
    });

    return (
      <div className="order-section-div">
        <div className="top-div_parent">
          <div
            className={
              this.props.orderStatusType === ORDER_STATUS_TYPES.ALL
                ? "top-div_child-all-active"
                : "top-div_child"
            }
            onClick={this.props.onAllTypeOrder}
          >
            All
          </div>
          <div
            className={
              this.props.orderStatusType === ORDER_STATUS_TYPES.PENDING
                ? "top-div_child-pending-active"
                : "top-div_child"
            }
            onClick={this.props.onPendingTypeOrder}
          >
            Pending
          </div>
          <div
            className={
              this.props.orderStatusType === ORDER_STATUS_TYPES.CONFIRM
                ? "top-div_child-confirm-active"
                : "top-div_child"
            }
            onClick={this.props.onConfirmTypeOrder}
          >
            Confirmed
          </div>
          <div
            className={
              this.props.orderStatusType === ORDER_STATUS_TYPES.CANCEL
                ? "top-div_child-cancel-active"
                : "top-div_child"
            }
            onClick={this.props.onCancelTypeOrder}
          >
            Cancelled
          </div>
        </div>
        <table className="order-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Order No</th>
              <th>Item Price</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    );
  }
}

export default AdminOrders;
