import { useEffect } from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import {
  changePage,
  fetchUsers,
  filterUsers,
} from "../../redux/actions/UserAction";
import { store } from "../../redux/Store";
import Loader from "../utils/Loader";
import Error from "../utils/Error";
import User from "./User";

const AllUsers = () => {
  useEffect(() => {
    async function fetchData() {
      await store.dispatch(fetchUsers());
      store.dispatch(filterUsers(""));
      store.dispatch(changePage({ page: 1, size: 12 }));
    }
    fetchData();
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
