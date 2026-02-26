import api from "./api";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password
  });

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
  }

  return res.data;
};
