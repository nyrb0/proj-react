import { FC, ReactNode } from "react";
import styled from "styled-components";

const ModalOut = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalContent = styled.div`
  z-index: 201;
  position: relative;
  background: #242424;
  padding: 15px;
  border-radius: 7px;
  min-width: 350px;
  @media (max-width: 450px) {
    min-width: 320px;
  }
`;

const BtnClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
`;

interface ModalI {
  children: ReactNode;
  close: () => void;
}
const Modal: FC<ModalI> = ({ children, close }) => {
  return (
    <ModalOut onClick={close}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <BtnClose onClick={close}>x</BtnClose>
        {children}
      </ModalContent>
    </ModalOut>
  );
};

export default Modal;
