import { Button, Card, Divider, Space } from "antd";
import React, { Component } from "react";
import axios from "axios";
import "./admin-promocodes.css";
import { authAdmin, getToken } from "../../../services/auth";
import { dateFormat } from "../../../utils/helper";
import api from "../../../utils/api-url";

const DATE_FORMAT_DEFAULT = "D/M/YYYY";
const CREATE_DATE_FORMAT = "h.ma, D/M/YYY";

class AdminPromoCodes extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      if (!authAdmin()) {
        this.props.history.replace("/admin/login");
      }
      const token = getToken();
      const config = {
        headers: { "x-autentication-token": `bearer ${token}` },
      };
      const promocodeResponse = await axios.get(
        api.ADMIN_PROMO_GET_URL,
        config
      );
      if (promocodeResponse.status === 201) {
        const { data: promocodes } = promocodeResponse;
        this.props.setPromocodesToState(promocodes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const cardItems = this.props.promocodes.map((promocode, index) => (
      <Card className="promo-inner-card" bordered={true} key={index}>
        <div className="promo-inner-card-div-first">
          <div>
            <Space size={30}>
              <span>{promocode.useTime}</span>
              <span>{promocode.title}</span>
            </Space>
          </div>
          <div>
            <Button
              className="edit-button"
              onClick={() => this.props.editPromocode(promocode, index)}
            >
              Edit
            </Button>
            {promocode.active ? (
              <Button
                className="deactive-button"
                onClick={() => this.props.setActive(promocode, index, false)}
              >
                Deactive
              </Button>
            ) : (
              <Button
                className="active-button"
                onClick={() => this.props.setActive(promocode, index, true)}
              >
                Active
              </Button>
            )}
          </div>
        </div>
        <Divider className="promo-divider"></Divider>
        <div className="promo-inner-card-div-second">
          <span>
            {`Created at: ${dateFormat(
              promocode.createdDate,
              CREATE_DATE_FORMAT
            ).toUpperCase()}`}
          </span>
          <span>{`Usage: ${promocode.usage}`}</span>
          <span>{`Discount: ${promocode.discountRate}%`}</span>
          <span>
            {`Start Date: ${dateFormat(
              promocode.startDate,
              DATE_FORMAT_DEFAULT
            )}`}
          </span>
          <span>{`End Date: ${dateFormat(
            promocode.endDate,
            DATE_FORMAT_DEFAULT
          )}`}</span>
        </div>
      </Card>
    ));

    return (
      <div className="promocode-container">
        <div className="promo-section-top-div">
          <Button
            className="promo-section-button"
            type="text"
            onClick={() => {
              this.props.history.push("/admin/add-promocode");
            }}
          >
            Add New Promo
          </Button>
        </div>
        {cardItems}
      </div>
    );
  }
}
export default AdminPromoCodes;
