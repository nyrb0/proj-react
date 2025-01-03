import { FC, ReactNode } from "react";
import styled from "styled-components";

const DrawerStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: #242424;
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  z-index: 999;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  color: #fff;
`;

interface DrawerI {
  children: ReactNode;
  close: () => void;
}

const Drawer: FC<DrawerI> = ({ children, close }) => {
  return (
    <DrawerStyled>
      <CloseButton onClick={close}>X</CloseButton>
      {children}
    </DrawerStyled>
  );
};

export default Drawer;
