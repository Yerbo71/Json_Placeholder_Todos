import { useEffect, useState } from "react";
import styles from "./NewTodo.module.scss";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

function NewTodo() {

  const [postInfo, setPostInfo] = useState({
    title: "",
    userId: null,
    completed: false,
  });
  const [valueInfo, setValueInfo] = useState({
    title: "",
    userId: null,
    completed: false,
  });

  const postData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(postInfo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  
      const json = await response.json();
      console.log(json);
    } catch (e) {
      console.error(e);
    }
  };
  

  useEffect(() => {
    postData();
  }, [postInfo]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setPostInfo(valueInfo);
  };

  const handleTitle = (event) => {
    setValueInfo({
      ...valueInfo,
      title: event.target.value
    });
  };
  
  const handleUserId = (event) => {
    setValueInfo({
      ...valueInfo,
      userId: event.target.value
    });
  };
  
  const handleCompleted = (event) => {
    setValueInfo({
      ...valueInfo,
      completed: event.target.checked
    });
  };
  

  return (
    <SideBar>
      <div className={styles.MainContainer}>
        <div className={styles.MainBox}>
            <h1>New Todo</h1>
          <form onSubmit={handleOnSubmit}>
            <p>Todo:</p>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Write your todo"
              value={valueInfo.title}
              onChange={handleTitle}
              className={styles.textInput}
            />
            <p>User_Id:</p>
            <input
              type="number"
              id="userId"
              name="userId"
              placeholder="User Id"
              value={valueInfo.userId || ""}
              onChange={handleUserId}
              className={styles.numberInput}
            />
            <div className={styles.CheckInput}>
            <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={valueInfo.completed}
                onChange={handleCompleted}
              />
            <label htmlFor="completed">
              Completed
            </label>

            </div>
            <div className={styles.buttonBox}>
            <button type="submit">
                Add
            </button>
            <Link to="/">
            <button className={styles.back}>
                Back
            </button>

            </Link>

            </div>
          </form>
        </div>
        <div className={styles.CardContainer}>
          <p>Title:</p>
            {postInfo.title}
            <p>User_Id:</p>
            {postInfo.userId}
            <p>Completed:</p>
            {postInfo.completed.toString()}
        </div>
      </div>
    </SideBar>
  );
}

export default NewTodo;
