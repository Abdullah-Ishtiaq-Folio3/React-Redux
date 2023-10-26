import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Popconfirm } from "antd";
import { store } from "../../redux/Store";
import {
  changePage,
  deleteUser,
  filterUsers,
  setCurrentUser,
  setOpenModal,
} from "../../redux/actions/UserAction";
import { useSelector } from "react-redux";

const { Meta } = Card;

const User = ({ user }) => {
  const { currentPage, currentPageSize, currentFilter } = useSelector(
    (state) => state.users
  );
  const handleEdit = () => {
    store.dispatch(setCurrentUser(user));
    store.dispatch(setOpenModal(true));
  };
  const handleDelete = () => {
    store.dispatch(deleteUser(user.id));
    store.dispatch(filterUsers(currentFilter));
    store.dispatch(changePage({ page: currentPage, size: currentPageSize }));
  };
  return (
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
      actions={[
        <EditOutlined key="edit" onClick={handleEdit} />,
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined key="delete" />
        </Popconfirm>,
      ]}
    >
      <Meta
        title={user.name}
        description={
          <>
            <p>
              {user.email} - {user.role}
            </p>
            <p>{user.phone ? user.phone : "+92-333-1234567"}</p>
          </>
        }
      />
    </Card>
  );
};

export default User;
