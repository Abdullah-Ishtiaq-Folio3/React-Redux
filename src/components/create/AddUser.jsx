import { Button, Modal } from "antd";
import AddUserForm from "./AddUserForm";
import { useSelector } from "react-redux";
import Loader from "../utils/Loader";
import Error from "../utils/Error";
import { store } from "../../redux/Store";
import { setOpenModal } from "../../redux/actions/UserAction";

const AddUser = () => {
  const {
    openModal,
    addLoading,
    addError,
    updateLoading,
    updateError,
    currentUser,
  } = useSelector((state) => state.users);

  const handleCancel = () => {
    store.dispatch(setOpenModal(false));
  };

  let content = <AddUserForm />;

  if (addLoading) content = <Loader text="Adding" height="50vh" />;
  else if (updateLoading) content = <Loader text="Updating" height="50vh" />;
  else if (addError)
    content = <Error code={addError.code} message={addError.message} />;
  else if (updateError)
    content = <Error code={updateError.code} message={updateError.message} />;
  return (
    <Modal
      open={openModal}
      title={currentUser == null ? "Add User" : "Edit User"}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      {content}
    </Modal>
  );
};
export default AddUser;
