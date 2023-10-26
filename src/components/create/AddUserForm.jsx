import { Button, Form, Input, Select } from "antd";
import { PhoneNumberUtil } from "google-libphonenumber";
import InputPhone from "./InputPhone";
import UploadImage from "./UploadImage";
import {
  createUser,
  editUser,
  filterUsers,
  changePage,
} from "../../redux/actions/UserAction";
import { store } from "../../redux/Store";
import { useSelector } from "react-redux";

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

const phoneUtil = PhoneNumberUtil.getInstance();
const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const AddUserForm = ({ toAdd, user }) => {
  const { currentPage, currentPageSize, currentFilter } = useSelector(
    (state) => state.users
  );
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: values.upload[0].response.location,
    };

    if (toAdd) await store.dispatch(createUser(newUser));
    else await store.dispatch(editUser({ newUser, id: user.id }));
    store.dispatch(filterUsers(currentFilter));
    store.dispatch(changePage({ page: currentPage, size: currentPageSize }));
  };

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
        initialValue={user?.name}
        rules={[
          {
            required: true,
            message: "Please input user's name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        initialValue={user?.email}
        rules={[
          {
            required: true,
            message: "Please input user's E-mail!",
          },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        initialValue={user?.password}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input user's password!",
          },
          () => ({
            validator(_, value) {
              const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
              if (!value || regex.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "The password must be at least 8 characters long and contain at least letter and one number and no special character."
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
        initialValue={user?.password}
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm user's password!",
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
        initialValue={user?.phone}
        rules={[
          {
            required: true,
            message: "Please enter phone number!",
          },
          () => ({
            validator(_, value) {
              if (!value || isPhoneValid(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Phone Number is not valid!"));
            },
          }),
        ]}
      >
        <InputPhone />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        initialValue={user?.role}
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

      <UploadImage initialValue={user?.avatar} toAdd={toAdd} />

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {toAdd ? <>Add User</> : <>Update User</>}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddUserForm;
