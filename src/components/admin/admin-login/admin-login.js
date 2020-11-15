import { Button, Card, Input } from "antd";
import React from "react";
import "./admin-login.css";

const AdminLogin = (props) => {
  return (
    <div className="login-container">
      <Card className="login-card-container">
        <div className="login-container-title">
          <span>Admin Panel</span>
        </div>
        <form>
          <div className="form-input-label">
            <label htmlFor="userId">
              User ID
              <Input
                className="text-input-filed"
                type="text"
                id="userId"
                name="userId"
                value={props.userId}
                onChange={props.handleUserIdChange}
              />
            </label>
          </div>
          <div className="form-input-label">
            <label htmlFor="password">
              Password
              <Input
                className="text-input-filed"
                type="password"
                id="password"
                name="password"
                value={props.password}
                onChange={props.handlePasswordChange}
              />
            </label>
          </div>
          <Button className="login-button" onClick={props.login}>
            Sign In
          </Button>
        </form>
      </Card>
      <div className="login-info">
        Use Following credentials to login
        <div>User ID:</div>
        <div>
          <span className="normal-font">User_SAjYvfamB</span>
        </div>
        <div>Password:</div>
        <div>
          <span className="normal-font">hello world!</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
