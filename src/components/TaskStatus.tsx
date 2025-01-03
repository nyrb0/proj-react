import { FC } from "react";
import styled from "styled-components";
import { type TypeTaskStatus } from "../types/List.type";
import { status } from "./constants";

const StatusButtonStyled = styled.button<{ isStatus: boolean }>`
  background-color: #0d63e3;
  height: 25px;
  width: 100%;
  border-radius: 6px;
  opacity: ${(props) => (props.isStatus ? ".5" : "1")};
  color: #fff;
`;

interface ITaskStatus {
  value: TypeTaskStatus;
  setStatus: (status: TypeTaskStatus) => void;
}
const TaskStatus: FC<ITaskStatus> = ({ value, setStatus }) => {
  return (
    <div className="df jss" style={{ gap: 5 }}>
      {Object.keys(status).map((s, i) => (
        <StatusButtonStyled
          key={i}
          isStatus={value === s}
          onClick={() => setStatus(s as TypeTaskStatus)}
        >
          {status[s as keyof typeof status]}
        </StatusButtonStyled>
      ))}
    </div>
  );
};

export default TaskStatus;
