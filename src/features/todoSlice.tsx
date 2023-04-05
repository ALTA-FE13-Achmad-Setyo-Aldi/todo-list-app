import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoistApi } from "@doist/todoist-api-typescript";

export interface Item {
  title: string;
  desc: string;
}

export interface TaskState {
  items: Item[];
}

const initialState: TaskState = {
  items: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addToTask(state, action: PayloadAction<Item>) {
      const api = new TodoistApi("a49fac9e06efdf61e35ddce0641b21f9f4c952f0");
      api
        .addTask({
          content: `${action.payload.title}`,
          description: `${action.payload.desc}`,
        })
        .then((task) => console.log(task))
        .catch((error) => console.log(error));
    },
  },
});

export const { addToTask } = taskSlice.actions;
