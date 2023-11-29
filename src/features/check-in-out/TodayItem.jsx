import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import { Link } from "react-router-dom";
import { useCheckout } from "./useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 7rem 10.5rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const {
    id,
    status,
    numNights,
    guests: { fullName, country, countryFlag },
  } = activity;

  const { isCheckingout, checkout } = useCheckout();

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Leaving</Tag>}

      {/* <Flag src={countryFlag} alt={`flag of ${country}`} /> */}

      <Guest>{fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/check-in/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          size="small"
          variation="primary"
          onClick={() => checkout(id)}
          disabled={isCheckingout}
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
