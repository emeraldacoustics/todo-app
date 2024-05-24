import { useState } from "react";

function TodoItem({item, selected, onEditClick, onDeleteClick, onSaveClick, onCancelClick}) {
  const [title, setTitle] = useState(item.title);
  const [note, setNote] = useState(item.note);

  if (selected === null) {
    return (
      <div>
        <h1>{item.title}</h1>
        <p>{item.note}</p>
        <button onClick={e => {
          e.preventDefault();
          onEditClick(item._id);
        }}>Edit</button>
        <button onClick={e => {
          e.preventDefault();
          onDeleteClick(item._id);
        }}>Delete</button>
      </div>      
    )
  } else if (item._id !== selected) {
    return (
      <div>
        <h1>{item.title}</h1>
        <p>{item.note}</p>
      </div>
    )
  } else {
    return (
      <div>
        <input onChange={e => {
          setTitle(e.target.value);
        }} value={title}></input>
        <input onChange={e => {
          setNote(e.target.value);
        }} value={note}></input>
        <button onClick={e => {
          e.preventDefault();
          onSaveClick(item._id, {
            title: title, note: note
          });
        }}>Save</button>
        <button onClick={e => {
          e.preventDefault();
          setTitle(item.title);
          setNote(item.note);
          onCancelClick(item._id);
        }}>Cancel</button>
      </div>
    )
  }
}

export default TodoItem;