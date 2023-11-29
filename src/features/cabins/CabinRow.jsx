import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, description, image } =
    cabin;
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  function handleDuplicate() {
    const { id: cabinId, name: originalName, ...newCabinInfo } = cabin;
    createCabin({ name: `Copy of ${originalName}`, ...newCabinInfo });
  }
  return (
    <Table.Row>
      <Img src={image}></Img>
      <Cabin>{name}</Cabin>
      <p>Up to {maxCapacity} guests</p>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount > 0 ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>

      <div>
        {/* <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>

        <EditCabin cabinToEdit={cabin}>
          <button>
            <HiPencil />
          </button>
        </EditCabin>

        <DeleteCabin
          cabinToDelete={cabin}
          deleteCabin={deleteCabin}
          isDeleting={isDeleting}
          name={name}
          id={id}
        >
          <button>
            <HiTrash />
          </button>
        </DeleteCabin> */}
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button onClick={handleDuplicate} disabled={isCreating}>
                <HiSquare2Stack />
                <span>Duplicate</span>
              </Menus.Button>

              <Modal.Open window="cabin-edit-form">
                <Menus.Button>
                  <HiPencil />
                  <span>Edit</span>
                </Menus.Button>
              </Modal.Open>

              <Modal.Open window="delete-cabin">
                <Menus.Button>
                  <HiTrash />
                  <span>Delete</span>
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="cabin-edit-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              resourceName={`Cabin ${name}`}
              onConfirm={() => deleteCabin(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
