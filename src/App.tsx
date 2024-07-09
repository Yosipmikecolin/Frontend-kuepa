import { Route, Routes } from "react-router";
import { Chats, Login, Register } from "./views";
import { PrivateRoute } from "./components";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { setToken, setName } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const nameUser = localStorage.getItem("name");
    setToken(token);
    setName(nameUser);
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/chats" element={<Chats />} />
      </Route>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<h1>Esta página no existe</h1>} />
    </Routes>
  );
}

export default App;
