import React from "react";
import { authAdmin } from "../../../services/auth";

const AdminPanel = (props) => {
  if (!authAdmin()) {
    props.history.replace("/admin/login");
  }
  return <div></div>;
};

export default AdminPanel;
