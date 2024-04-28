import { useState } from "react";

function Home() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [result, setResult] = useState({});
  // fetch(`${backend_url}/api/v1/todolist`, {
  //   method: 'GET',
  //   // headers: {
  //   //   'Content-Type': 'application/json'
  //   // },
  //   // body: JSON.stringify({
  //   //   name: "Alex McMahon",
  //   //   email: "alexmcmahon960505@gmail.com",
  //   //   password: "789uiojklM<>"
  //   // })
  // }).then(response => {
  //   // Check if the response is OK (status code 200-299)
  //   // setResult(response.json());
  //   alert(response);
  // });
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