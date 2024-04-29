import { useState } from "react";
import axios from 'axios';

function Home() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  fetch(`${backend_url}/api/v1/todolist`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  return (
    <>
    </>
  );
}

export default Home;