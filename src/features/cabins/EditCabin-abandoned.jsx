import { HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function EditCabin({ cabinToEdit, children }) {
  return (
    <Modal>
      <Modal.Open window="cabin-edit-form">{children}</Modal.Open>
      <Modal.Window name="cabin-edit-form">
        <CreateCabinForm cabinToEdit={cabinToEdit} />
      </Modal.Window>
    </Modal>
  );
}

export default EditCabin;
