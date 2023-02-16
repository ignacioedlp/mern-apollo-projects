import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/user/signup", {
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
      navigate("/login");
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
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
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;
