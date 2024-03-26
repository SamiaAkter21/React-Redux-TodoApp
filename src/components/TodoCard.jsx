// components/TodoCard.js
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  makeStyles,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Proptypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  card: {
    transition: "transform 0.3s",
    cursor: "pointer",
    "&:hover": {
      boxShadow: `0 0 10px 0px ${theme.palette.primary.main}`,
      transform: "scale(1.02)",
    },
  },
  deleteButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const TodoCard = ({ todo, onDeleteTodo, onEditTodo }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const classes = useStyles();

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [open, setOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState({...todo});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedTodo({...todo});
  };

  const handleSave = () => {
    onEditTodo(editedTodo);
    setEditedTodo({...todo});
    handleClose();
  };
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {todo.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{
              whiteSpace: "normal",
              maxHeight: showFullDescription ? "none" : "3em",
              overflow: "hidden",
              justifyContent: "stretch",
            }}
          >
            {todo.description}
          </Typography>
          {todo.description.length > 100 && (
            <IconButton onClick={handleToggleDescription}>
              {showFullDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={handleClickOpen}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteTodo(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginBottom: "1rem" }}
          autoFocus
          variant="outlined"
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          defaultValue={todo.title}
          onChange={(e) => setEditedTodo({ ...todo, title: e.target.value })}
        />
        <TextField
          variant="outlined"
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          defaultValue={todo.description}
          onChange={(e) => setEditedTodo({ ...todo, description: e.target.value })}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

TodoCard.propTypes = {
  todo: Proptypes.object,
  onDeleteTodo: Proptypes.func,
  onEditTodo: Proptypes.func,
};

export default TodoCard;
