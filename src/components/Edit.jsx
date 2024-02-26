import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import styles from "./Edit.module.scss";

function Edit() {
  const { id } = useParams();
  const [todoData, setTodoData] = useState({
    title: "",
    userId: null,
    completed: false,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const data = await response.json();
      setTodoData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(todoData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const updatedTodo = await response.json();
      console.log(updatedTodo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  return (
    <SideBar>
      <div className={styles.MainContainer}>
        <div className={styles.MainBox}>
        <h2>Edit Todo</h2>
        <div className={styles.formCon}>
          <label htmlFor="title"
            className={styles.labelTitle}
          >Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={todoData.title}
              onChange={handleInputChange}
              className={styles.textInput}
            />
        </div>
        <div className={styles.formCon}>
          <label htmlFor="userId"
          className={styles.labelUser}
          >User ID:</label>
            <input
              type="number"
              id="userId"
              name="userId"
              value={todoData.userId || ""}
              onChange={handleInputChange}
              className={styles.numberInput}
            />
        </div>
        <div className={styles.formCon2}>
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={todoData.completed}
              onChange={() => setTodoData({ ...todoData, completed: !todoData.completed })}
            />
            <label htmlFor="completed">Completed:</label>
            </div>
            <div className={styles.buttonBox}>
            <button onClick={handleUpdate}
            
            >Update</button>
            <Link to="/">
              <button
              className={styles.back}
              >Back</button>
            </Link>

            </div>

        </div>
     </div>

    </SideBar>

  );
}

export default Edit;
