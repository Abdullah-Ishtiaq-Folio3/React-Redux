import { Button, Layout } from "antd";
import AllUsers from "./components/retrieve/AllUsers";

const { Header, Content, Footer } = Layout;
const HomePage = () => {
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button type="default">Add User</Button>
      </Header>
      <Content>
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
