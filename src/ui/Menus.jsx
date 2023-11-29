import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [currentId, setCurrentId] = useState("");
  const [listPosition, setListPosition] = useState(null);

  const open = setCurrentId;
  const close = () => setCurrentId("");

  return (
    <MenusContext.Provider
      value={{ currentId, open, close, listPosition, setListPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { currentId, open, close, setListPosition } = useContext(MenusContext);
  function handleClick(e) {
    e.stopPropagation();
    currentId === "" || currentId !== id ? open(id) : close();

    const rect = e.target.closest("button").getBoundingClientRect();
    // console.log(rect);
    // console.log(window.innerWidth);
    setListPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + 5,
    });
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { currentId, listPosition, close } = useContext(MenusContext);
  const { ref } = useClickOutside(close, false);
  // console.log("currentId", currentId);
  // console.log("id", id);
  if (currentId !== id) return null;

  return createPortal(
    <StyledList position={listPosition} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, onClick, disabled }) {
  const { close } = useContext(MenusContext);
  // console.log("onClick", onClick);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
