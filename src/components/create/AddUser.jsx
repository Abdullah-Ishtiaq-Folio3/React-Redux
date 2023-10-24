import { Button, Modal } from "antd";
import AddUserForm from "./AddUserForm";

const AddUser = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      title="Add User"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <AddUserForm />
    </Modal>
  );
};
export default AddUser;
