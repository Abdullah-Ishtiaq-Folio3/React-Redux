import { Button, Form, Input, Select } from "antd";
import AntPhone from "./InputPhone";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const onFinish = (values) => {
  console.log(values);
};

const AddUserForm = () => {
  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="addUser"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          () => ({
            validator(_, value) {
              const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
              if (!value || regex.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                )
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
            message: "Please select role!",
          },
        ]}
      >
        <AntPhone />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: "Please select role!",
          },
        ]}
      >
        <Select placeholder="select your role">
          <Option value="customer">Customer</Option>
          <Option value="admin">Admin</Option>
          <Option value="employee">Employee</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddUserForm;
