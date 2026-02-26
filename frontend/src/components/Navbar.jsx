import "../styles/dashboard.css";

export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <h2>Upturn Technology</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
