import './index.css';
import { useEffect, useState } from "react";
import TodoItem from './todo-item';
import axios from 'axios';

function Home() {
  const [result, setResult] = useState([]);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [resPerPage, setResPerPage] = useState(5);
  const [itemCount, setItemCount] = useState(0);
  const pageCount = Math.max(1, Math.floor((itemCount + resPerPage - 1) / resPerPage));

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  function reload(curPageParam = curPage, resPerPageParam = resPerPage) {
    axios.get(`${backend_url}/api/v1/todolist?curPage=${curPageParam}&resPerPage=${resPerPageParam}`, {
      withCredentials: true
    })
    .then(res => {
      setResult(res.data.result);
      setItemCount(res.data.itemCount);
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
      // if (res.data.success === true) {
      //   setResult(result.filter(item => item._id !== _id));
      // }
      reload();
    }).catch(error => {
      console.log(error);
    })
  }

  function onSaveClick(_id, item) {
    console.log("save: ");
    console.log(item);
    setSelected(null);
    if (adding) {
      setAdding(false);
      axios.post(`${backend_url}/api/v1/todolist`, {
        ...item
      }, { withCredentials: true })
      .then(res => {
        // if (res.data.success) {
        //   setResult([res.data.result, ...result]);
        // }
        reload();
      })
    } else {
      axios.put(`${backend_url}/api/v1/todolist`, {
        ...item
      }, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setResult(result.map(itm => itm._id === _id ? item : itm));
        }
      })
    }
  }

  function onCancelClick(_id) {
    if (adding)
      setAdding(false);
    setSelected(null);
  }

  const list = result.map(item => {
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
      
      {
        adding ?
          <TodoItem
            key=''
            item={{_id: '', done: false, title: '', note: ''}}
            selected={selected}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onSaveClick={onSaveClick}
            onCancelClick={onCancelClick}
          />
        :
          <button onClick={onAddClick}>Add</button>
      }

      {list}

      <div className="page-controller">
        <button
          onClick={e => {
            e.preventDefault();
            if (curPage > 0) {
              setCurPage(e => e - 1);
              reload(curPage - 1, resPerPage);
            }
          }}
        >{'<'}</button>
        {curPage + 1} / {pageCount}
        <button
          onClick={e => {
            e.preventDefault();
            if (curPage + 1 < pageCount) {
              setCurPage(e => e + 1);
              reload(curPage + 1, resPerPage);
            }
          }}
        >{'>'}</button>
        <select
          onChange={e => {
            setResPerPage(+e.target.value);
            reload(curPage, +e.target.value);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </div>
    </>
  );
}

export default Home;