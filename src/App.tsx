import { Route, Routes } from "react-router";
import { Login, Register } from "./views";

function App() {
  return (
    <Routes>
      {/*       <Route
        element={
          <PrivateRoute isAuthenticated={user} isLoginComponent={true} />
        }
      >
        <Route path="/" element={<Login />} />
      </Route> */}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<h1>Noe eiste esta pagina</h1>} />
    </Routes>
  );
}

export default App;
