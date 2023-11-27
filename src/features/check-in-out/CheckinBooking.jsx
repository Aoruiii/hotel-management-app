import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

// Add breakfast option
// //1. add checkbox to accept adding breakfast
// //2. if checkbox was checked, payment need to be confirmed again with new price
// 3. if adding breakfast, modify the hasBreakfast, extrasPrice,totalPrice in the database

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const [isChecked, setIsChecked] = useState(false);
  const { isCheckingin, checkin } = useCheckin();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingBreakfastPrice } = useSettings();

  useEffect(
    function () {
      setIsChecked(booking?.isPaid || false);
    },
    [booking?.isPaid]
  );

  if (isLoading || isLoadingBreakfastPrice) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const breakfastPrice = settings.breakfastPrice * numGuests * numNights;
  const updatedTotalPrice = totalPrice + breakfastPrice;

  function handleCheckin() {
    if (bookingId) {
      if (addBreakfast) {
        checkin({
          bookingId,
          breakfast: {
            hasBreakfast: true,
            extrasPrice: breakfastPrice,
            totalPrice: updatedTotalPrice,
          },
        });
      } else {
        checkin({ bookingId, breakfast: {} });
      }
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setIsChecked(false);
            }}
            disabled={isCheckingin}
          >
            {`Want to add breakfast for ${formatCurrency(breakfastPrice)}`}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isChecked}
          onChange={() => setIsChecked((isChecked) => !isChecked)}
          disabled={(!addBreakfast && booking?.isPaid) || isCheckingin}
          id="breakfast"
        >
          I confirm that this booking has been paid with
          {!addBreakfast
            ? `${formatCurrency(totalPrice)}`
            : `${formatCurrency(updatedTotalPrice)}
          (${formatCurrency(totalPrice)}+${formatCurrency(breakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isChecked || isCheckingin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
