import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import styles from"./Todos.module.scss";
import { Link } from "react-router-dom";

function Todos() {
  const [todosData, setTodosData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);


  const getData = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const resData = await res.json();
      setTodosData(resData);
      console.log(resData);
    } catch (e) {
      console.log(e);
  };
}

  useEffect(() => {
    getData();
  }, []);

  const deleteHandler = async (id) => {
    console.log(id);
    try{
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
  method: 'DELETE',
       });
    }catch(e){
      console.log(e)
    }

  }

  const filteredTodos = todosData.filter((todo) => {
    const searchTermMatch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const completionStatusMatch = showCompleted? todo.completed : !todo.completed;
    return searchTermMatch && completionStatusMatch;
  });

  return (
    <SideBar>
      <div className={styles.MainFrame}>
        <div className={styles.MainHeader}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.SearchInput}
            />
            <button
                className={styles.FilterButton}
                type="checkbox"
                onClick={() => setShowCompleted(!showCompleted)}
            >{!showCompleted ? "Show Completed" : "Show Incompleted"}</button>
        </div>
        <div className={styles.NewTodoBox}>
          <Link to="/newTodo">Add New Todo</Link>
        </div>
        <div className={styles.TodosContainer}>
            {filteredTodos.map((todo) => (
                <div key={todo.id}
                className={styles.TodosCard}
                >
                <div className={styles.Status}>Status: 
                    <div  style={{color: todo.completed ? "green" : "red"}}>
                        {todo.completed ? "Completed" : "Incomplete"}
                    </div>
                </div>
                <div className={styles.Title}>Title:
                    <div className={styles.TitleText}>
                        {todo.title}
                    </div>
                </div>
                <div className={styles.buttonBox}>
                  <Link to={"/" + todo.id}><button className={styles.editbut}>Edit</button></Link>
                  <button className={styles.deletebut}onClick={() => deleteHandler(todo.id)}>Delete</button>
                </div>
                </div>
            ))}
        </div>
    </div>
    </SideBar>
  );
}

export default Todos;
