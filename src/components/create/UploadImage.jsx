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

const UploadImage = ({ toAdd, initialValue }) => {
  return (
    <Form.Item
      name="upload"
      label="Avatar"
      valuePropName="fileList"
      initialValue={
        initialValue
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                response: { location: initialValue },
              },
            ]
          : null
      }
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
            {toAdd ? <>Upload</> : <>Change</>}
          </div>
        </div>
      </Upload>
    </Form.Item>
  );
};

export default UploadImage;
