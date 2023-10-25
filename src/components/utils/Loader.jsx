import { Spin } from "antd";

const Loader = () => (
  <Spin tip="Loading" size="large">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    />
  </Spin>
);
export default Loader;
