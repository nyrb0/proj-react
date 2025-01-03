import { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  all: unset;
  width: 100%;
  background: transparent;
  border-bottom: 1px solid #fff;
  outline: none;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #fff;
`;

interface TaskInputInputI extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

const TaskInput: FC<TaskInputInputI> = ({ children, ...rest }) => {
  return <InputStyled {...rest} />;
};

export default TaskInput;
