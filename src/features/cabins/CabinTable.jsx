import styled from "styled-components";

import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  // Filter the cabins
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  // Sort the cabins
  const sortValue = searchParams.get("sortBy") || "name-asc";
  const [field, order] = sortValue.split("-");
  const modifier = order === "asc" ? 1 : -1;
  let sortedCabins;
  if (field === "name") {
    sortedCabins = filteredCabins.sort(
      (a, b) => modifier * a[field].localeCompare(b["name"])
    );
  } else {
    sortedCabins = filteredCabins.sort(
      (a, b) => modifier * (a[field] - b[field])
    );
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Menus>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Menus>
    </Table>
  );
}

export default CabinTable;
