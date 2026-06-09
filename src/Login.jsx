import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const navigate = useNavigate();

  async function handleLogInForm(e) {
    e.preventDefault();

    const body = new FormData();
    body.set("name", name);
    body.set("password", password);
    console.log("here");
    await fetch("http://localhost:3000/blog-api/login", {
      method: "POST",
      body: new URLSearchParams(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        //localStorage.setItem("token", data.token);
      });
    navigate("/");
  }
  function handleInputName(e) {
    setName(e.target.value);
  }
  function handleInputPassword(e) {
    setPassword(e.target.value);
  }
  return (
    <>
      <h1>Blog Client</h1>
      <h2>Log in page</h2>
      <form>
        <label>
          Name : <input type="text" name="name" onChange={handleInputName} />
        </label>
        <label>
          Password :{" "}
          <input type="text" name="password" onChange={handleInputPassword} />
        </label>
        <button onClick={handleLogInForm}>log in</button>
      </form>
    </>
  );
}

export default Login;
