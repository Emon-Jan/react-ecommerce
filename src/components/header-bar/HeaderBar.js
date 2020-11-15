import React from "react";
import { Avatar, Badge, Col, Input, Layout, Row, Space } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./HeaderBar.css";

const { Header } = Layout;

const SEACR_ICON_STYLE = {
  fontSize: 20,
  color: "#d9d9d9",
};

let userId = "";

const showSearchBar = (props) => {
  const { pathname } = props.location;
  const user = localStorage.getItem("user");

  if (user) {
    const { loggedInUser } = JSON.parse(user);
    userId = loggedInUser.userId;
  }

  const locationCheck =
    pathname === "/admin/orders" ||
    pathname === "/admin/products" ||
    pathname === "/admin/promocodes" ||
    pathname === "/admin/add-promocode" ||
    pathname === "/admin/admin-panel" ||
    pathname === "/admin/add-product";

  if (locationCheck) {
    return (
      <Col span={3} push={1}>
        <Space>
          {!userId ? <span>User Name</span> : <span>{userId}</span>}
        </Space>
      </Col>
    );
  }
  return (
    <React.Fragment>
      <Col span={10}>
        <Input
          placeholder="Search"
          className="text-input"
          name="searchText"
          prefix={<SearchOutlined style={SEACR_ICON_STYLE} />}
          value={props.searchText}
          onChange={props.handelSearchTextChange}
        />
      </Col>
      <Col span={3} push={1}>
        <Link to="/cart" id="link-header">
          <Space>
            <ShoppingCartOutlined
              style={{
                fontSize: 25,
                color: "black",
              }}
            />
            <span
              style={{
                color: "black",
              }}
            >
              Cart
            </span>
            {!!props.totalItems && (
              <Badge
                style={{ backgroundColor: "#FFDA2F" }}
                count={props.totalItems}
              />
            )}
          </Space>
        </Link>
      </Col>
      <Col span={3} push={1}>
        <Space>
          <UserOutlined
            style={{
              fontSize: 25,
            }}
          />
        </Space>
      </Col>
    </React.Fragment>
  );
};

export const HeaderBar = (props) => {
  return (
    <Header className="site-layout-background">
      <Row>
        <Col span={18} push={6}>
          <Row justify="end">{showSearchBar(props)}</Row>
        </Col>
        <Col span={6} pull={18}>
          <Avatar
            shape="square"
            size={64}
            src={`${process.env.PUBLIC_URL}/logo.png`}
          />
        </Col>
      </Row>
    </Header>
  );
};
