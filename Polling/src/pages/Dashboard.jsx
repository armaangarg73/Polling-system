import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserPolls } from "../services/pollService.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getUserPolls();

        setPolls(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPolls();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div>
      <h1>DashBoard</h1>

      <button onClick={() => navigate("/create")}>Create Poll</button>
      <button onClick={handleLogout}>Logout</button>
      <hr />

      <h2>Your Polls</h2>

      {polls.map((poll) => (
        <div key={poll._id}>
          <h3>{poll.title}</h3>
          <p>{poll.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
