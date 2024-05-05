import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    tasks: [],
    currentTask:null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            state.tasks.push({
                id: uuidv4(),
                title: action.payload.title,
                description: action.payload.description,
                dueDate: action.payload.dueDate,
                priority: action.payload.priority,
                completed: false,
            });
        },
        getTask:(state,action)=>{
            console.log(action.payload,'payl')
            const task = state.tasks.find((task) => task.id === action.payload.taskId);
            console.log(task,'finded task')
            return { ...state, currentTask: task };
        }
        ,
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        toggleTask: (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );
        },
        updateTask: (state, action) => {
            const { id, title, description, dueDate, priority } = action.payload;
            const index = state.tasks.findIndex((task) => task.id === id);

            if (index !== -1) {
                state.tasks[index] = {
                    ...state.tasks[index],
                    title: title || state.tasks[index].title,
                    description: description || state.tasks[index].description,
                    dueDate: dueDate || state.tasks[index].dueDate,
                    priority: priority || state.tasks[index].priority,
                };
            }
        },
    },
    //   extraReducers: (builder) => {
    //     builder
    //       .addCase('persist/REHYDRATE', (state, action) => {
    //         return action.payload.tasks || state;
    //       })
    //       .addDefaultCase((state) => state);
    //   },
});

export const { addTask,getTask, deleteTask, toggleTask, updateTask } = tasksSlice.actions;

export const sortTasks = (tasks, sortBy, sortOrder) => {
    if (sortBy === 'dueDate') {
        return [...tasks].sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);

            if (sortOrder === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    } else if (sortBy === 'priority') {
        return [...tasks].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.priority.localeCompare(b.priority);
            } else {
                return b.priority.localeCompare(a.priority);
            }
        });
    } else if (sortBy === 'completed') {
        return [...tasks].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.completed - b.completed;
            } else {
                return b.completed - a.completed;
            }
        });
    }

    return tasks;
};

export const filterTasks = (tasks, filterStatus,id) => {
    if (filterStatus === 'completed') {
        return tasks.filter((task) => task.completed);
    } else if (filterStatus === 'incomplete') {
        return tasks.filter((task) => !task.completed);
    }
    else if (filterStatus === 'id') {
        return tasks.filter((task) => task.id===id);
    }

    return tasks;
};



export const searchTasks = (tasks, searchQuery) => {
    return tasks.filter((task) =>
        [task.title, task.description].some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase())

        )

    );
};

export default tasksSlice.reducer;