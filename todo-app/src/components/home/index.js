import { useEffect, useState } from "react";
import TodoItem from './todo-item';
import axios from 'axios';

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  function reload() {
    axios.get(`${backend_url}/api/v1/todolist`, { withCredentials: true })
    .then(res => {
      setTodoList(res.data.result);
    }).catch(error => {
      console.error(error);
      window.location = "/login";
    });
  }

  function logout() {
    axios.get(`${backend_url}/api/v1/logout`, { withCredentials: true })
    .then(res => {
      if (res.data.success === true) {
        window.location = "/login";
      }
    }).catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    reload();
  }, []);

  function onAddClick() {
    if (selected === null) {
      setAdding(true);
      setSelected('');
    }
  }

  function onEditClick(_id) {
    if (!adding)
      setSelected(_id);
  }

  function onDeleteClick(_id) {
    axios.delete(`${backend_url}/api/v1/todolist`, {
      withCredentials: true,
      data: { _id }
    }).then(res => {
      if (res.data.success === true) {
        setTodoList(todoList.filter(item => item._id !== _id));
      }
    }).catch(error => {
      console.log(error);
    })
  }

  function onSaveClick(_id, item) {
    setSelected(null);
    if (adding) {
      setAdding(false);
      axios.post(`${backend_url}/api/v1/todolist`, {
        title: item.title,
        note: item.note
      }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setTodoList([res.data.result, ...todoList]);
        }
      })
    } else {
      axios.put(`${backend_url}/api/v1/todolist`, {
        _id,
        title: item.title,
        note: item.note
      }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setTodoList(todoList.map(itm => itm._id === _id ? {...itm, title: item.title, note: item.note} : itm));
        }
      })
    }
  }

  function onCancelClick(_id) {
    if (adding)
      setAdding(false);
    setSelected(null);
  }

  const list = todoList.map(item => {
    return (
      <TodoItem
        key={item._id}
        item={item}
        selected={selected}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}
      />
    )
  });
  return (
    <>
      {
        adding ?
          <TodoItem
            key=''
            item={{_id: '', title: '', note: ''}}
            selected={selected}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onSaveClick={onSaveClick}
            onCancelClick={onCancelClick}
          />
        :
          <button onClick={onAddClick}>Add</button>
      }
      <button
        onClick={e => {
          e.preventDefault();
          reload();
        }}
      >Refresh</button>
      <button
        onClick={e => {
          e.preventDefault();
          logout();
        }}
      >Logout</button>
      <ul>
        {list}
      </ul>
    </>
  );
}

export default Home;