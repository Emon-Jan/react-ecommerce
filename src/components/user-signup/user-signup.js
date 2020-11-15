import React from "react";
import { Button, Card, Input } from "antd";
import "./user-signup.css";
import MessageModal from "../modal/message-modal";

import { CheckCircleFilled } from "@ant-design/icons";

const UserLogin = (props) => {
  return (
    <div className="login-container">
      <Card className="login-card-container">
        <form>
          <div className="form-input-label">
            <label htmlFor="userPhone">
              Phone
              <Input
                className="login-input_field"
                type="tel"
                id="userPhone"
                name="userPhone"
                value={props.userPhone}
                onChange={props.handleUserPhoneChange}
              />
            </label>
          </div>
          <div className="form-input-label">
            <label htmlFor="userPassword">
              Password
              <Input
                className="login-input_field"
                type="userPassword"
                id="userPassword"
                name="userPassword"
                value={props.userPassword}
                onChange={props.handleUserPasswordChange}
              />
            </label>
          </div>
          <Button className="login-button" onClick={props.signUp}>
            Sign Up
          </Button>
        </form>
      </Card>
      <MessageModal
        isModalOpen={props.isSignupModalOpen}
        width={200}
        top={150}
        onCancel={props.onCancelSuccessModal}
      >
        <div className="signup-modal-mes-div">
          <CheckCircleFilled style={{ fontSize: 25 }} />
          <span className="signup-modal-span-top">You Signed up</span>
          <span className="signup-modal-span-top">Successfully</span>
        </div>
      </MessageModal>
    </div>
  );
};

export default UserLogin;
