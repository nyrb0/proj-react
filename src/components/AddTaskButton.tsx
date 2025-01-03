import { ButtonHTMLAttributes, FC } from "react";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";

const AddButton = styled.button`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background: #cc1616;
`;

type AddTaskI = ButtonHTMLAttributes<HTMLButtonElement>;

const AddTask: FC<AddTaskI> = ({ ...rest }) => {
  return (
    <AddButton {...rest} className="df jcc aic">
      <IoIosAdd fill="#fff" size={35} />
    </AddButton>
  );
};

export default AddTask;
