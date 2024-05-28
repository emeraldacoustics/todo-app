import './index.css';
import { useState } from "react";

function TodoItem({ item, selected, onEditClick, onDeleteClick, onSaveClick, onCancelClick }) {
  const [done, setDone] = useState(item.done);
  const [title, setTitle] = useState(item.title);
  const [note, setNote] = useState(item.note);
  const bEdit = item._id === selected;

  return (
    <div className='todo-item'>
      <div className='done'>
        {
          bEdit ? (
            <input
              type="checkbox"
              checked={done}
              onChange={e => {
                console.log(e.target.checked);
                setDone(e.target.checked);
              }}
            ></input>
          ) : (
            <input
              type="checkbox"
              checked={done}
            ></input>
          )
        }
      </div>
      <div className='title-note-group'>
        <div className='title'>
          {
            bEdit ? (
              <input
                onChange={e => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            ) : (
              title
            )
          }
        </div>
        <div className='note'>
          {
            bEdit ? (
              <input
                onChange={e => {
                  setNote(e.target.value);
                }}
                value={note}
              />
            ) : (
              note
            )
          }
        </div>
      </div>
      <div className='btn-group'>
        {
          bEdit ? (
            <>
              <button
                className="mini-button"
                onClick={e => {
                  e.preventDefault();
                  onSaveClick(item._id, {
                    ...item,
                    done: done,
                    title: title,
                    note: note
                  });
                }}>Save</button>
              <button
                className="mini-button"
                onClick={e => {
                  e.preventDefault();
                  setDone(item.done);
                  setTitle(item.title);
                  setNote(item.note);
                  onCancelClick(item._id);
                }}>Cancel</button>
            </>
          ) : (
            <>
              <button
                className="mini-button"
                onClick={e => {
                  e.preventDefault();
                  onEditClick(item._id);
                }}>Edit</button>
              <button
                className="mini-button"
                onClick={e => {
                  e.preventDefault();
                  onDeleteClick(item._id);
                }}>Delete</button>
            </>
          )
        }
      </div>
    </div>
  )
}

export default TodoItem;