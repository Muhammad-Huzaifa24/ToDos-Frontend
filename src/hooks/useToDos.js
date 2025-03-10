import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/toDoService";

export const useTodos = (isCompleted) => {
  return useQuery({
    queryKey: ["todos", isCompleted],
    queryFn: () => fetchTodos(isCompleted),
  });
};

// Add Todo Mutation
export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

// Update Todo Mutation
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedTodo }) => updateTodo(id, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

// Delete Todo Mutation
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
