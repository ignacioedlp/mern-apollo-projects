import React, { useState } from "react";
import useAuth from "../hooks/userAuth.jsx";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });

    if (response.ok) {
      const { token } = await response.json();
      login(token);
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
