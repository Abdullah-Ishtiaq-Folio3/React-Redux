import { Button, Layout, Pagination, Dropdown } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import AllUsers from "./components/retrieve/AllUsers";
import AddUser from "./components/create/AddUser";
import { useSelector } from "react-redux";
import { store } from "./redux/Store";
import {
  setOpenModal,
  changePage,
  filterUsers,
} from "./redux/actions/UserAction";
import { ROLES } from "./constants/Constants";

const { Header, Content, Footer } = Layout;

const handleFilterClick = (e) => {
  let role = "";
  if (e.key == 2) role = ROLES.CUSTOMER;
  else if (e.key == 3) role = ROLES.EMPLOYEE;
  else if (e.key == 4) role = ROLES.ADMIN;
  store.dispatch(filterUsers(role));
  store.dispatch(changePage({ page: 1, size: 12 }));
};

const menuProps = {
  items: [
    {
      label: "All",
      key: 1,
    },
    {
      label: "Customers",
      key: 2,
    },
    {
      label: "Employees",
      key: 3,
    },
    {
      label: "Admins",
      key: 4,
    },
  ],
  onClick: handleFilterClick,
};

const HomePage = () => {
  const { openModal, filteredUsers } = useSelector((state) => state.users);
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          backgroundColor: "seagreen",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            type="default"
            onClick={() => store.dispatch(setOpenModal(true))}
          >
            Add User
          </Button>
        </div>
        <div>
          <Pagination
            defaultPageSize={12}
            total={filteredUsers.length}
            onChange={(page, size) =>
              store.dispatch(changePage({ page, size }))
            }
          />
        </div>
        <div>
          <Dropdown.Button
            menu={menuProps}
            placement="bottom"
            icon={<FilterOutlined />}
          >
            Filter
          </Dropdown.Button>
        </div>
      </Header>
      <Content>
        {openModal && <AddUser />}

        <AllUsers />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        © Abdullah Ishtiaq @ Folio3
      </Footer>
    </Layout>
  );
};

export default HomePage;
