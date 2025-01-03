import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  margin-top: 10px;
  padding: 10px;
  background: #4aca9d;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
  }
`;

interface ButtonI extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonI> = ({ children, ...rest }) => {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
};

export default Button;
