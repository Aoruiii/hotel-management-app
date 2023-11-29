import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    bookings,
    isLoading: isLoadingRecentBookings,
    numDays,
  } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingRecentStays,
  } = useRecentStays();

  const { cabins, isLoading: isLoadingCabins } = useCabins();

  const isLoading =
    isLoadingRecentBookings || isLoadingRecentStays || isLoadingCabins;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} numDays={numDays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
