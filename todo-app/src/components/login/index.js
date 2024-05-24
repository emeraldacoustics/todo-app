import { useState } from "react";
import axios from "axios";
import Cookie from 'js-cookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    const backend_url = process.env.REACT_APP_BACKEND_URL;

    axios.post(`${backend_url}/api/v1/login`, {
      email,
      password
    }).then(res => {
      console.log(res);
      if (res.data.success === true) {
        Cookie.set('token', res.data.token);
        window.location = "/";
      } else {
        alert("Invalid Email or Password");
      }
    }).catch(error => {
      alert("Invalid Email or Password");
      console.log(error);
    });
  }
  
  return (
    <>
      <form autoComplete="on">
        <input
          onChange={e => {
            setEmail(e.target.value);
          }}
          value={email}
        ></input>
        <input
          type="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
          value={password}
        ></input>
        <button
          onClick={e => {
            e.preventDefault();
            login();
          }}
        >OK</button>
      </form>
    </>
  );
}

export default Login;