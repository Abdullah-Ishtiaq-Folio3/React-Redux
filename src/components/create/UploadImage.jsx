import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import { BASE_URL, END_POINTS } from "../../constants/Constants";

const props = {
  name: "file",
  action: BASE_URL + END_POINTS.FILE_UPLOAD,
  "Content-Type": "multipart/form-data",
  maxCount: 1,
  listType: "picture-card",
};

const getFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const UploadImage = () => {
  return (
    <Form.Item
      name="upload"
      label="Avatar"
      valuePropName="fileList"
      getValueFromEvent={getFile}
      rules={[
        {
          required: true,
          message: "Please upload user's image!",
        },
      ]}
    >
      <Upload {...props}>
        <div>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
      </Upload>
    </Form.Item>
  );
};

export default UploadImage;
