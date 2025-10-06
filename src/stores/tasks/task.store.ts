import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces/task.interface";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { immer } from "zustand/middleware/immer";

export interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;
  removingDraggingTaskId: () => void;
  changeProgress: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const StoreApi: StateCreator<TaskState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },
  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status };

    //? con middleware immer sin instalacion solo agregar en el create
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });
    //? requiere npm i immer
    // set(produce((state:TaskState)=>{
    //     state.tasks[newTask.id]=newTask;
    // }))

    //? forma nativa de zustand
    // set(state => ({
    //     tasks:{
    //         ...state.tasks,
    //         [newTask.id]: newTask
    //     }
    // }))
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },
  removingDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },
  changeProgress: (taskId: string, status: TaskStatus) => {
    // const task = get().tasks[taskId];
    // task.status=status;

    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });

    //  set((state)=>({
    //     tasks:{
    //         ...state.tasks,
    //         [taskId]:task
    //     }
    // }))
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeProgress(taskId, status);
    get().removingDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(StoreApi), { name: "task-store" }))
);
