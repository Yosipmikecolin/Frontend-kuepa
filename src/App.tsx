import { Route, Routes } from "react-router";
import { Chats, Login, Register } from "./views";
import { PrivateRoute } from "./components";

function App() {
  return (
    <Routes>
      <Route
        element={
          <PrivateRoute />
        }
      >
        <Route path="/chats" element={<Chats />} />
      </Route>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<h1>Noe eiste esta pagina</h1>} />
    </Routes>
  );
}

export default App;
