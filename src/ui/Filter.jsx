import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-100);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-100);
  }
`;
function Filter({ filterName, options = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get(filterName);
  function handleClick(filterValue) {
    searchParams.set(filterName, filterValue);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {
        options.map((option, index) => (
          <FilterButton
            onClick={() => handleClick(option.value)}
            key={index}
            disabled={option.value === activeFilter && activeFilter}
            active={String(option.value === activeFilter)}
          >
            {option.label}
          </FilterButton>
        ))
        /* <FilterButton onClick={() => handleClick("all")}></FilterButton>
      <FilterButton onClick={() => handleClick("with-discount")}>
        With Discount
      </FilterButton>
      <FilterButton onClick={() => handleClick("no-discount")}>
        No Discount
      </FilterButton> */
      }
    </StyledFilter>
  );
}

export default Filter;
