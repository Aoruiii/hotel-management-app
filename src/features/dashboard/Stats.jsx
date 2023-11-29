import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCircleStack,
  HiOutlineTicket,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  //   console.log(bookings);
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = confirmedStays?.length;
  const occupantNights = confirmedStays?.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const availableNights = numDays * numCabins;

  const occupancyRate =
    ((occupantNights / availableNights) * 100).toFixed(1) + "%";

  return (
    <>
      <Stat
        icon={<HiOutlineTicket />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineCircleStack />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check-ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        value={occupancyRate}
        color="yellow"
      />
    </>
  );
}

export default Stats;
