import React, { useState, useEffect } from "react";
import { addTask, updateTask, deleteTask, fetchAllTasks } from "../../api/goalList";
import "./home.css";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");

    const handleAddTask = async () => {
        if (taskText) {
            try {
                await addTask(taskText);
                setTaskText("");
                fetchAllTasks();
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    const handleUpdateTask = async (task) => {
        console.log('task',task);
        try {
            await updateTask(task.pubkey, !task.is_done);
            fetchAllTasks(); // Re-fetch tasks after updating
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (task) => {
        try {
            await deleteTask(task.pubkey);
            fetchAllTasks(); // Re-fetch tasks after deleting
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const fetchGoals = async () => {
        try {
            const tasks = await fetchAllTasks();
            setTasks(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);


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
                    <div key={task.publicKey}>
                        <span>{task.text}</span>
                        {!task.isDone && (
                            <button onClick={() => handleUpdateTask(task)}>
                                Done
                            </button>
                        )}
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
