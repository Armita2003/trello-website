import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    Stack,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const initialTodoTasks = [
    { id: "task1", content: "Task 1" },
    { id: "task2", content: "Task 2" },
];
const initialInProgressTasks = [];
const initialDoneTasks = [];

const isBrowser = typeof window !== "undefined";

export default function Board() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [draggedTask, setDraggedTask] = useState(null);
    const [todoTasks, setTodoTasks] = useState(initialTodoTasks);
    const [inProgressTasks, setInProgressTasks] = useState(
        initialInProgressTasks
    );
    const [doneTasks, setDoneTasks] = useState(initialDoneTasks);
    const [isMounted, setIsMounted] = useState(false);
    const [newTaskContent, setNewTaskContent] = useState({
        todo: "",
        inProgress: "",
        done: "",
    });
    useEffect(() => {
        if (isBrowser) {
            const storedTodo = JSON.parse(localStorage.getItem("todoTasks"));
            const storedInProgress = JSON.parse(
                localStorage.getItem("inProgressTasks")
            );
            const storedDone = JSON.parse(localStorage.getItem("doneTasks"));

            setTodoTasks(storedTodo || initialTodoTasks);
            setInProgressTasks(storedInProgress || initialInProgressTasks);
            setDoneTasks(storedDone || initialDoneTasks);
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
        }
    }, [todoTasks, isMounted]);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem(
                "inProgressTasks",
                JSON.stringify(inProgressTasks)
            );
        }
    }, [inProgressTasks, isMounted]);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
        }
    }, [doneTasks, isMounted]);

    if (!isMounted) {
        return <div>Loading...</div>;
    }

    const handleAddTask = (columnId) => {
        const content = newTaskContent[columnId].trim();
        if (!content) {
            setOpenSnackbar(true);
            return;
        }
        const newTaskId = `task-${Date.now()}`;
        const newTask = { id: newTaskId, content };

        if (columnId === "todo") {
            setTodoTasks([...todoTasks, newTask]);
        } else if (columnId === "inProgress") {
            setInProgressTasks([...inProgressTasks, newTask]);
        } else if (columnId === "done") {
            setDoneTasks([...doneTasks, newTask]);
        }

        setNewTaskContent((prev) => ({
            ...prev,
            [columnId]: "",
        }));
    };

    const handleDeleteTask = (columnId, taskId) => {
        if (columnId === "todo") {
            setTodoTasks(todoTasks.filter((task) => task.id !== taskId));
        } else if (columnId === "inProgress") {
            setInProgressTasks(
                inProgressTasks.filter((task) => task.id !== taskId)
            );
        } else if (columnId === "done") {
            setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
        }

        setOpenSnackbar(false);
    };

    const handleDragStart = (task, sourceColumnId) => {
        setDraggedTask({ task, sourceColumnId });
    };

    const handleDrop = (destinationColumnId) => {
        if (!draggedTask) return;

        const { task, sourceColumnId } = draggedTask;

        if (sourceColumnId === "todo") {
            setTodoTasks(todoTasks.filter((t) => t.id !== task.id));
        } else if (sourceColumnId === "inProgress") {
            setInProgressTasks(inProgressTasks.filter((t) => t.id !== task.id));
        } else if (sourceColumnId === "done") {
            setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
        }

        if (destinationColumnId === "todo") {
            setTodoTasks([...todoTasks, task]);
        } else if (destinationColumnId === "inProgress") {
            setInProgressTasks([...inProgressTasks, task]);
        } else if (destinationColumnId === "done") {
            setDoneTasks([...doneTasks, task]);
        }

        setDraggedTask(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleCloseSnackbar = (reason) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    };
    return (
        <Stack
            direction='row'
            justifyContent='center'
            spacing={2}
            sx={{
                marginTop: 4,
                mx: 2,
            }}
        >
            {[
                { id: "todo", tasks: todoTasks, title: "To Do" },
                {
                    id: "inProgress",
                    tasks: inProgressTasks,
                    title: "In Progress",
                },
                { id: "done", tasks: doneTasks, title: "Done" },
            ].map((column) => (
                <Stack
                    key={column.id}
                    sx={{
                        backgroundColor: "white",
                        padding: 2,
                        width: 300,
                        minHeight: 500,
                        borderRadius: 2,
                    }}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(column.id)}
                >
                    <Typography variant='h6' gutterBottom>
                        {column.title}
                    </Typography>

                    {column.tasks.map((task) => (
                        <Card
                            key={task.id}
                            sx={{
                                marginBottom: 2,
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                            draggable
                            onDragStart={() => handleDragStart(task, column.id)}
                        >
                            <CardContent>{task.content}</CardContent>
                            <IconButton
                                onClick={() =>
                                    handleDeleteTask(column.id, task.id)
                                }
                                size='small'
                            >
                                <CancelOutlinedIcon fontSize='small' />
                            </IconButton>
                        </Card>
                    ))}

                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder='Add a task'
                        value={newTaskContent[column.id] || ""}
                        onChange={(e) =>
                            setNewTaskContent({
                                ...newTaskContent,
                                [column.id]: e.target.value,
                            })
                        }
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            textTransform: "none",
                        }}
                        onClick={() => handleAddTask(column.id)}
                    >
                        Add Task
                    </Button>
                </Stack>
            ))}
            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                autoHideDuration={2000}
            >
                <Alert
                    severity='warning'
                    onClose={handleCloseSnackbar}
                    variant='filled'
                    sx={{ width: "100%" }}
                >
                    Please fill out the Textfield
                </Alert>
            </Snackbar>
        </Stack>
    );
}
