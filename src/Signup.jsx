import { useState } from "react";

function Signup() {
  const [name, setName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [userCreated, setUserCreated] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignUpForm(e) {
    e.preventDefault();

    const body = new FormData();
    body.set("name", name);
    body.set("password", password);
    await fetch("http://localhost:3000/blog-api/users", {
      method: "POST",
      body: new URLSearchParams(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserCreated(true);
        setMessage(data.message);
        console.log(data.message);
        //localStorage.setItem("token", data.token);
      });
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
      <h2>Sign up page</h2>
      {userCreated ? (
        <>
          <p>{message}</p>
          <a href="login">Go and log in with your new account</a>
        </>
      ) : (
        <form>
          <label>
            Name : <input type="text" name="name" onChange={handleInputName} />
          </label>
          <label>
            Password :
            <input type="text" name="password" onChange={handleInputPassword} />
          </label>
          <button onClick={handleSignUpForm}>log in</button>
        </form>
      )}
    </>
  );
}

export default Signup;
