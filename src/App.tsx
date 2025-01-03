import { useEffect, useState } from "react";
import styled from "styled-components";
import List from "./components/Task"; // Исправлено: "conponents" на "components"
import {
  ListI,
  TypeCategotyStatus,
  TypeListFormState,
  TypeTaskStatus,
} from "./types/List.type";
import Add from "./components/AddTaskButton";
import "./App.css";
import Drawer from "./components/Drawer";
import Input from "./components/TaskInput";
import Button from "./components/Button";
import Modal from "./components/Modal";
import TaskStatus from "./components/TaskStatus";
import TaskFilterStatus from "./components/TaskFilterStatus";

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Position = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

function App() {
  const [list, setList] = useState<ListI[]>([]);
  const [task, setTask] = useState<TypeListFormState>({
    title: "",
    status_work: "notDone",
    desc: "",
  });
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [categoryStatus, setCategoryStatus] =
    useState<TypeCategotyStatus>("all");
  const [edit, setEdit] = useState<ListI>({
    title: "",
    desc: "",
    status_work: "notDone",
    id: 0,
  });
  const [prevTask, setPrevTask] = useState<ListI | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [delId, setDelId] = useState<number | null>();

  const handleCreateTask = (v: React.ChangeEvent<HTMLInputElement>) => {
    setTask((p) => ({ ...p, [v.target.name]: v.target.value }));
  };
  const handleEditTask = (v: React.ChangeEvent<HTMLInputElement>) => {
    setEdit((p) => ({ ...p, [v.target.name]: v.target.value }));
  };

  const isValidTask = (task: Omit<ListI, "id" | "status_work">): boolean =>
    !task.title || !task.desc;

  const addToTask = () => {
    if (isValidTask(task)) {
      setErr(`Поля не должны быть пустым`);
      return;
    }

    const newTask = { ...task, id: Date.now() };
    const addToPrevTask = [...list, newTask];
    setList(addToPrevTask);
    localStorage.setItem("tasks", JSON.stringify(addToPrevTask));
    setTask({ title: "", desc: "", status_work: "notDone" });
    setOpen(false);
    setErr(null);
  };

  const toEdit = () => {
    if (!edit) return;
    else if (isValidTask(edit)) {
      setErr(`Поля не должны быть пустым`);
      return;
    } else if (prevTask === edit) {
      setOpenEdit(false);
      setPrevTask(null);
      setErr(null);
      return;
    }
    const filter = list.map((f) => {
      if (f.id === edit.id) return (f = edit);
      return f;
    });

    localStorage.setItem("tasks", JSON.stringify(filter));
    setList(filter);
    setPrevTask(null);
    setErr(null);
    setOpenEdit(false);
  };

  const deleteTask = () => {
    if (delId !== null) {
      const newList = list.filter((f) => f.id !== delId);
      localStorage.setItem("tasks", JSON.stringify(newList));
      setList(newList);
      setDelId(null);
    }
    setIsDelete(false);
  };

  const deleteOk = (id: number) => {
    setDelId(id);
    setIsDelete(true);
  };

  const toOpenEdit = (l: ListI) => {
    setOpenEdit(true);
    setEdit(l);
    setPrevTask(l);
  };

  const filterTask = (status: TypeCategotyStatus): ListI[] => {
    return status === "all"
      ? list
      : list.filter((task) => task.status_work === status);
  };

  const handleFilterStatusCategory = (value: TypeCategotyStatus) => {
    setCategoryStatus(value);
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setList(savedTasks);
  }, []);

  return (
    <>
      <Container>
        <TaskFilterStatus
          value={categoryStatus}
          setStatus={handleFilterStatusCategory}
        />
      </Container>
      {isDelete && (
        <Modal close={() => setIsDelete(false)}>
          <div className="tasks_warning">Действительно хотите удалить?</div>
          <div className="tasks_btns df">
            <Button onClick={deleteTask}>Да</Button>
            <Button onClick={() => setIsDelete(false)}>Нет</Button>
          </div>
        </Modal>
      )}
      {openEdit && (
        <Modal close={() => setOpenEdit(false)}>
          <div className={"tasks_text"}>Редактировать задачу</div>
          <div className={"tasks_title"}>
            <Input
              name="title"
              value={edit.title}
              onChange={handleEditTask}
              placeholder="Название"
            />
          </div>
          <div className="tasks_task">
            <Input
              name="desc"
              value={edit.desc}
              onChange={handleEditTask}
              placeholder="Задача"
            />
          </div>
          <div className="tasks_warning">{err}</div>
          <div>
            <TaskStatus
              value={edit.status_work}
              setStatus={(s: TypeTaskStatus) =>
                setEdit((prev) => ({ ...prev, status_work: s }))
              }
            />
          </div>
          <div className="tasks_btns">
            <Button disabled={isValidTask(edit)} onClick={toEdit}>
              Сохранить
            </Button>
            <Button onClick={() => setOpenEdit(false)}>Отменить</Button>
          </div>
        </Modal>
      )}
      <div className="tasks">
        <Container>
          {open && (
            <Drawer close={() => setOpen(false)}>
              <div className={"tasks_text"}>Добавить новую задачу</div>
              <div className={"tasks_title"}>
                <Input
                  name={"title"}
                  value={task.title}
                  onChange={handleCreateTask}
                  placeholder="Название"
                />
              </div>
              <div className="tasks_task">
                <Input
                  name={"desc"}
                  value={task.desc}
                  onChange={handleCreateTask}
                  placeholder="Задача"
                />
                <div className="tasks_warning">{err}</div>
                <div className="tasks_btn df jcc">
                  <Button disabled={isValidTask(task)} onClick={addToTask}>
                    Добавить
                  </Button>
                </div>
              </div>
            </Drawer>
          )}
          <ul>
            {list.length ? (
              filterTask(categoryStatus).map((l) => (
                <div className="list" key={l.id}>
                  <List task={l} deleteList={deleteOk} toEdit={toOpenEdit} />
                </div>
              ))
            ) : (
              <h1 className="df jcc aic">(Пусто)</h1>
            )}
          </ul>
        </Container>

        <Position>
          <Add onClick={() => setOpen(true)} />
        </Position>
      </div>
    </>
  );
}

export default App;
