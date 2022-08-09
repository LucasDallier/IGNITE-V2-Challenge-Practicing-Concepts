import { useCallback, useState } from "react";

//Libs
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//Assets
import Logo from "../../assets/Logo.svg";
import Clipboard from "../../assets/Clipboard.svg";

//Styles
import {
  Container,
  Header,
  ContentForm,
  HeaderList,
  Content,
  ListTasks,
  Task,
  ButtonDelete,
  NoHaveTask,
} from "./styles";

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const inputValueRef = e.target.elements[0].value;

      if (inputValueRef) {
        setTasks([
          ...tasks,
          {
            id: v4(),
            selected: false,
            name: inputValueRef,
          },
        ]);
      }
      e.target.elements[0].value = "";
    },
    [tasks]
  );

  const handleDelete = useCallback(
    (id) => {
      const newArrayFiltered = tasks.filter((t) => t.id !== id);
      setTasks(newArrayFiltered);
    },
    [tasks]
  );

  const tasksConcluded = tasks.filter((tc) => tc.selected === true);

  return (
    <Container>
      <Header>
        <img src={Logo} alt="" />
      </Header>

      <Content>
        <ContentForm>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Adicione uma nova tarefa" />

            <button type="submit">
              <span>Criar</span>
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </form>

          <HeaderList>
            <div>
              <span>Tarefas Criadas</span>
              <button type="button">{tasks?.length}</button>
            </div>
            <div>
              <span>Concluídas</span>
              <button type="button" className="task-concluded">
                {tasksConcluded.length} de {tasks.length}
              </button>
            </div>
          </HeaderList>

          <ListTasks>
            {tasks.length === 0 && (
              <NoHaveTask>
                <img src={Clipboard} alt="" />
                <span>Você ainda não tem tarefas cadastradas</span>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </NoHaveTask>
            )}

            {tasks.map((p) => {
              return (
                <Task key={p.id} checked={p.selected}>
                  <div className="content-task">
                    <label className="check">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setTasks((oldValue) =>
                            oldValue.map((t) => {
                              if (t.id === p.id) {
                                return {
                                  ...t,
                                  selected: e.target.checked,
                                };
                              }
                              return t;
                            })
                          )
                        }
                      />
                      <div className="box"></div>
                    </label>
                  </div>
                  <span>{p?.name}</span>

                  <ButtonDelete
                    type="button"
                    onClick={() => handleDelete(p.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </ButtonDelete>
                </Task>
              );
            })}
          </ListTasks>
        </ContentForm>
      </Content>
    </Container>
  );
}

export default ToDoList;
