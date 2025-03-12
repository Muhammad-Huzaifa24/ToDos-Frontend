import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/toDos.service";
// import queryClient from "../main.jsx"

export const useTodos = (isCompleted) => {
  return useQuery({
    queryKey: ["todos", isCompleted],
    queryFn: () => fetchTodos(isCompleted),
  });
};

// Add Todo Mutation
export const useAddTodo = () => {
  return useMutation({
    mutationFn: addTodo,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["todos"]);
    // },
  });
};

// Update Todo Mutation
export const useUpdateTodo = () => {
  return useMutation({
    mutationFn: ({ id, updatedTodo }) => updateTodo(id, updatedTodo),
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["todos"]);
    // },
  });
};

// Delete Todo Mutation
export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: deleteTodo,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["todos"]);
    // },
  });
};
