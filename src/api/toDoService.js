import axiosInstance from "./axiosInstance";

// Fetch all todos (optional filtering based on isCompleted)
export const fetchTodos = async (isCompleted) => {
  const response = await axiosInstance.post("/get-todos", { isCompleted });  
  return response.data;
};

// Add a new todo
export const addTodo = async (todo) => {
  const response = await axiosInstance.post("/todos", todo);
  return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
  const response = await axiosInstance.put(`/todos/${id}`, updatedTodo);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data;
};
