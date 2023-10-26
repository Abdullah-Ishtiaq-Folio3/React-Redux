import React, { useState, useEffect } from "react";
import { Col, Row, Pagination } from "antd";
import User from "./User";
import { useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/UserAction";
import { store } from "../../redux/Store";
import Loader from "../utils/Loader";
import Error from "../utils/Error";

const AllUsers = () => {
  useEffect(() => {
    store.dispatch(fetchUsers());
  }, []);

  const { usersToDisplay, fetchLoading, fetchError } = useSelector(
    (state) => state.users
  );

  if (fetchLoading) return <Loader text="Loading" />;
  if (fetchError)
    return <Error code={fetchError.code} message={fetchError.message} />;

  const rows = [];
  for (let i = 0; i < usersToDisplay.length; i += 4) {
    const rowUsers = usersToDisplay.slice(i, i + 4);
    rows.push(
      <Row key={i} style={{ margin: 10 }}>
        {rowUsers.map((user) => (
          <Col key={user.id} span={6}>
            <User user={user} />
          </Col>
        ))}
      </Row>
    );
  }

  return <>{rows}</>;
};

export default AllUsers;
