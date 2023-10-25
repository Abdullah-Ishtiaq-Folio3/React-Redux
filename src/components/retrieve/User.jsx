import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";

const { Meta } = Card;

const User = ({ user }) => (
  <Card
    style={{
      width: 320,
    }}
    cover={
      <img
        alt="avatar"
        src={user.avatar}
        style={{ width: 320, height: 240, objectFit: "cover" }}
      />
    }
    actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
  >
    <Meta
      title={user.name}
      description={
        <>
          <p>{user.email}</p>
          <p>{user.phone ? user.phone : "+92-333-1234567"}</p>
        </>
      }
    />
  </Card>
);

export default User;
