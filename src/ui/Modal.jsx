import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";

import useClickOutside from "../hooks/useClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
// 1. create a context
export const ModalContext = createContext();

// 2. create the parent component
function Modal({ children }) {
  const [windowName, setWindowName] = useState("");

  const open = setWindowName;
  const close = () => setWindowName("");

  return (
    <ModalContext.Provider value={{ windowName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3. create child components
function Open({ window = "", children }) {
  const { open } = useContext(ModalContext);
  console.log("window", window);

  return cloneElement(children, { onClick: () => open(window) });
}

function Window({ name = "", children }) {
  const { windowName, close } = useContext(ModalContext);
  // console.log("windowName", windowName);
  // console.log("name", name);

  const { ref } = useClickOutside(close);

  if (name !== windowName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4. Add child components as property to parent components
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
