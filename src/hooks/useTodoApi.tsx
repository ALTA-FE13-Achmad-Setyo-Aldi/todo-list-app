import { useState, useEffect, useCallback } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

export default function useTodoApi() {
  const [todoList, setTodoList] = useState<any>([]);
  const api = new TodoistApi("a49fac9e06efdf61e35ddce0641b21f9f4c952f0");

  const fetchListTodo = useCallback(async () => {
    const todoListFetch = await api.getTasks();
    console.log("CALLED", todoListFetch);
    setTodoList(todoListFetch);
    return todoListFetch;
  }, []);

  const createTodoTask = useCallback(async (payload: any) => {
    const newTodo = await api.addTask({ ...payload });
    setTodoList([...todoList, newTodo]);
    return newTodo;
  }, []);

  const updateTodoTask = useCallback(async (payload: any) => {
    const newTodo = await api.updateTask(payload.id, { ...payload });
    setTodoList([...todoList, newTodo]);
    return newTodo;
  }, []);

  const deleteTodoTask = useCallback(async (payload: any) => {
    const deletedTodo = await api.deleteTask(payload.id);

    return deletedTodo;
  }, []);

  useEffect(() => {
    fetchListTodo();
  }, []);

  return {
    todoList,
    fetchListTodo,
    createTodoTask,
    updateTodoTask,
    deleteTodoTask,
  };
}
