import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      
      if (res.data.role === "hr") {
        navigate("/hr");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Upturn Technology</h1>
        <p>HR Management Portal</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Login</button>
      </form>
    </div>
  );
}
