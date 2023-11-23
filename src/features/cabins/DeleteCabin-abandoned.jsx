import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinRow from "./CabinRow";
import Row from "../../ui/Row";
import ConfirmDelete from "../../ui/ConfirmDelete";

function DeleteCabin({ children, deleteCabin, isDeleting, id, name }) {
  return (
    <Modal>
      <Modal.Open window="delete-cabin">{children}</Modal.Open>
      <Modal.Window name="delete-cabin">
        <ConfirmDelete
          resourceName={`Cabin ${name}`}
          onConfirm={() => deleteCabin(id)}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteCabin;
