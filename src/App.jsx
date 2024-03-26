import React from "react";
import { Container, Typography} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./redux/todosSlice";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (todo) => {
    dispatch(addTodo(todo));
  };

  const handleEditTodo = (editedTodo) => {
    dispatch(editTodo(editedTodo));
  };

  function handleDeleteTodo(id) {
    dispatch(deleteTodo(id));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Todo App
      </Typography>
      <TodoForm onSaveTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onEditTodo={handleEditTodo} onSaveTodo={handleAddTodo}/>
    </Container>
  );
}

export default App;
