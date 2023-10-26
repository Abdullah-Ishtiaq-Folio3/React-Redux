import { Spin } from "antd";

const Loader = ({ text, height }) => (
  <Spin tip={text} size="large">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height ? height : "100vh",
      }}
    />
  </Spin>
);
export default Loader;
