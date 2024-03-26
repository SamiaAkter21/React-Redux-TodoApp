// components/TodoList.js
import React from "react";
import { Grid } from "@material-ui/core";
import TodoCard from "./TodoCard"; // Import the TodoCard component

const TodoList = ({ todos, onDeleteTodo, onEditTodo, onSaveTodo }) => {
  return (
    <Grid container spacing={2}>
      {todos.map((todo) => (
        <Grid item key={todo.id} xs>
          <TodoCard 
            todo= {todo} onDeleteTodo={onDeleteTodo} onEditTodo={onEditTodo} onSaveTodo={onSaveTodo}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoList;
