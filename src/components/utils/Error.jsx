import { Result } from "antd";

const Error = ({ code, message }) => (
  <Result status="500" title={code} subTitle={message} />
);
export default Error;
