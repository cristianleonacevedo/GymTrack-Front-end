import Main from "../module/pages/Main";
import Register from "../module/pages/Register";
import Login from "../module/pages/Login";
import Home from "../module/pages/Home";
import ProtectedRoute from "../components/protectedtRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />

        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
