import styled from "styled-components";
import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [showEditForm, setShowEditForm] = useState(false);
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  function handleDuplicate() {
    const { id: cabinId, name: originalName, ...newCabinInfo } = cabin;
    createCabin({ name: `Copy of ${originalName}`, ...newCabinInfo });
  }
  return (
    <>
      <TableRow>
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <p>Up to {maxCapacity} guests</p>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount > 0 ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowEditForm((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={() => deleteCabin(id)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
