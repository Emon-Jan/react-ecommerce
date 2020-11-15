import React from "react";
import { Modal } from "antd";

function MessageModal(props) {
  return (
    <Modal
      visible={props.isModalOpen}
      width={props.width}
      bodyStyle={{ height: props.height }}
      style={{ top: props.top, left: props.left }}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      okButtonProps={{
        style: { display: "none" },
      }}
      closable={false}
      footer={null}
      onCancel={props.onCancel}
    >
      {props.children}
    </Modal>
  );
}

export default MessageModal;
