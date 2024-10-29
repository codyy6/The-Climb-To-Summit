import React, { useState, useEffect } from "react";
// import { addTask, updateTask, deleteTask } from "./solanaService";
import "./home.css";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");

    const handleAddTask = async () => {
        if (taskText) {
            // await addTask(taskText);
            // const newTask = {
            //     publicKey: Date.now().toString(), // Placeholder for unique key
            //     text: taskText,
            //     is_done: false
            // };
            setTasks([...tasks, taskText]);
            setTaskText("");
            fetchTasks(); // Re-fetch tasks after adding
        }
    };

    const handleUpdateTask = async (task) => {
        // await updateTask(task.publicKey, !task.is_done);
        fetchTasks(); // Re-fetch tasks after updating
    };

    const handleDeleteTask = async (task) => {
        // await deleteTask(task.publicKey);
        fetchTasks(); // Re-fetch tasks after deleting
    };

    const fetchTasks = () => {
        // Fetch tasks logic from the blockchain, update state
        // Placeholder: You should implement fetching logic based on your smart contract
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div>
                {tasks.map((task) => (
                    <div>
                        <span>{task}</span>
                        <button onClick={() => handleUpdateTask(task)}>
                            {task.is_done ? "Undo" : "Done"}
                        </button>
                        <button onClick={() => handleDeleteTask(task)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
