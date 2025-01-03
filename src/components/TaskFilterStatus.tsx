import { FC } from "react";
import styled from "styled-components";
import { TypeCategotyStatus, TypeTaskStatus } from "../types/List.type";
import { status } from "./constants";

interface TaskFilterStatusI {
  setStatus: (status: TypeCategotyStatus) => void;
  value: TypeCategotyStatus;
}

const StatusesStyled = styled.li<{ isStatus: boolean }>`
  font-size: 30px;
  font-weight: 900;
  opacity: ${({ isStatus }) => (isStatus ? ".5" : "1")};
  transition: transform 0.3s ease;
  cursor: pointer;
  transform: scale(0.95);
  &:hover {
    transform: scale(1);
  }

  @media (max-width: 720px) {
    font-size: 20px;
  }
  @media (max-width: 450px) {
    font-size: 12px;
  }
`;

const TaskFilterStatus: FC<TaskFilterStatusI> = ({ setStatus, value }) => {
  const category = { all: "Все", ...status };

  return (
    <ul className="df jss" style={{ marginTop: 30, width: "100%" }}>
      {Object.keys(category).map((s, i) => (
        <StatusesStyled
          isStatus={s === value}
          key={i}
          onClick={() => setStatus(s as TypeTaskStatus)}
        >
          {category[s as keyof typeof category]}
        </StatusesStyled>
      ))}
    </ul>
  );
};

export default TaskFilterStatus;
