import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open window="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isShowModal, setIsShowModal] = useState(false);
//   return (
//     <>
//       <Button
//         onClick={() => setIsShowModal((isShown) => !isShown)}
//         variation="primary"
//         size="medium"
//       >
//         Add new Cabin
//       </Button>
//       {isShowModal && (
//         <Modal onClose={() => setIsShowModal(false)}>
//           <CreateCabinForm onClose={() => setIsShowModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
