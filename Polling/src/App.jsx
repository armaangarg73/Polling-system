import { Route, Routes } from "react-router-dom";
import CreatePoll from "./pages/CreatePoll";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PollDetails from "./pages/PollDetails";
import PollResults from "./pages/PollResults";
import Home from "./pages/Home";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePoll />
          </ProtectedRoute>
        }
      />
      <Route path="/poll/:id" element={<PollDetails />} />
      <Route path="/poll/:id/results" element={<PollResults />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
