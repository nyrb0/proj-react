import { FC } from "react";
import styled from "styled-components";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ListI, TypeTaskStatus } from "../types/List.type";

const ListStyled = styled.li`
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background: #242424;
  width: 100%;
  border-radius: 5px;
  min-height: 30px;
  padding: 10px 20px;
  box-sizing: border-box;

  &:hover .edit-icon {
    visibility: visible;
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const TheTask = styled.div`
  margin-top: 4px;
  font-size: 17px;
  font-weight: 400;
  & span {
    font-weight: 900;
  }
  max-width: 700px;
  overflow-wrap: break-word;
`;

const EditAndDelete = styled.div`
  width: 60px;
`;
const EditIcon = styled(MdModeEditOutline)`
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  cursor: pointer;
`;

const StatusStyled = styled.div<{ status: TypeTaskStatus }>`
  margin-top: 20px;
  font-size: 15px;
  & span {
    color: ${(props) =>
      props.status === "done"
        ? "green"
        : props.status === "inProgress"
        ? "yellow"
        : "red"};
  }
`;

interface TaskI {
  task: ListI;
  deleteList: (id: number) => void;
  toEdit: (sel: ListI) => void;
}

const Task: FC<TaskI> = ({ task, deleteList, toEdit }) => {
  return (
    <ListStyled className={`df jss`}>
      <div>
        <Title>Название: {task.title}</Title>
        <TheTask>
          <span>Задача: </span>
          {task.desc}
        </TheTask>
        <StatusStyled status={task.status_work}>
          Статус: <span>{task.status_work}</span>
        </StatusStyled>
      </div>
      <EditAndDelete className="df jss aic">
        <EditIcon className="edit-icon" onClick={() => toEdit(task)} />
        <MdDelete
          onClick={() => {
            deleteList(task.id);
          }}
        />
      </EditAndDelete>
    </ListStyled>
  );
};

export default Task;
