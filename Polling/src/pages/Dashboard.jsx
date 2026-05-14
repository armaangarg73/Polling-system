import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserPolls } from "../services/pollService.js";
import { deletePoll } from "../services/pollService.js";
import { publishResults } from "../services/pollService.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getUserPolls();

        setPolls(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch polls");
      }
    };
    fetchPolls();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  const handleDeletePoll = async (pollId) => {
    try {
      await deletePoll(pollId);

      setPolls(polls.filter((poll) => poll._id !== pollId));
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handlePublishResults = async (pollId) => {
    try {
      await publishResults(pollId);

      setMessage("Results published successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        relative
        overflow-hidden
      "
    >
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.08),transparent_50%)]" />

      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="fixed bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 flex">
        <aside
          className="
            hidden
            lg:flex
            flex-col
            w-[300px]
            min-h-screen
            border-r
            border-white/[0.05]
            bg-white/[0.02]
            backdrop-blur-2xl
            p-8
          "
        >
          <div className="mb-16">
            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                bg-gradient-to-r
                from-white
                to-gray-500
                text-transparent
                bg-clip-text
              "
            >
              PollSphere
            </h1>

            <p className="text-gray-600 mt-2 text-sm">
              Enterprise Polling Platform
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/create")}
              className="
                w-full
                p-5
                rounded-2xl
                bg-white
                text-black
                font-semibold
                text-left
                hover:scale-[1.02]
                transition-all
                mb-6
              "
            >
              + Create Poll
            </button>
          </div>

          <div
            className="
                  p-5
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/[0.05]
                  mb-6
                "
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />

              <h2 className="text-lg font-semibold">Realtime Active</h2>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed">
              WebSocket infrastructure connected. Live poll analytics streaming
              in realtime.
            </p>
          </div>

          <div
            className="
                  p-5
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/[0.05]
                "
          >
            <h2 className="text-lg font-semibold mb-3">Platform Status</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Socket.IO</span>

                <span className="text-emerald-400">Connected</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Database</span>

                <span className="text-cyan-400">Stable</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">API</span>

                <span className="text-purple-400">Operational</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="
                w-full
                p-4
                rounded-2xl
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                hover:bg-red-500/20
                transition-all
              "
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8 lg:p-14">
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-8
              mb-14
            "
          >
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-2
                  rounded-full
                  bg-white/[0.03]
                  border
                  border-white/[0.08]
                  mb-6
                "
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                <span className="text-sm text-gray-400">
                  Realtime infrastructure active
                </span>
              </div>

              <h1
                className="
                  text-6xl
                  lg:text-7xl
                  font-black
                  tracking-tight
                  leading-none
                  mb-5
                "
              >
                Realtime Poll
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-white
                    via-gray-300
                    to-gray-600
                    text-transparent
                    bg-clip-text
                  "
                >
                  Command Center
                </span>
              </h1>

              <p className="text-xl text-gray-500 max-w-2xl">
                Monitor live polls, publish analytics and manage realtime
                audience engagement.
              </p>
            </div>
          </div>

          {message && (
            <div
              className="
                mb-10
                p-5
                rounded-2xl
                border
                border-cyan-500/20
                bg-cyan-500/5
                text-cyan-400
              "
            >
              {message}
            </div>
          )}

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-4
              gap-6
              mb-14
            "
          >
            <div
              className="
                p-8
                rounded-3xl
                bg-white/[0.03]
                border
                border-white/[0.05]
              "
            >
              <h2 className="text-5xl font-black">{polls.length}</h2>

              <p className="text-gray-500 mt-3">Total Polls</p>
            </div>

            <div
              className="
                p-8
                rounded-3xl
                bg-white/[0.03]
                border
                border-white/[0.05]
              "
            >
              <h2 className="text-5xl font-black">
                {polls.filter((poll) => poll.isPublished).length}
              </h2>

              <p className="text-gray-500 mt-3">Published</p>
            </div>

            <div
              className="
                p-8
                rounded-3xl
                bg-white/[0.03]
                border
                border-white/[0.05]
              "
            >
              <h2 className="text-5xl font-black text-emerald-400">Live</h2>

              <p className="text-gray-500 mt-3">Stream Status</p>
            </div>

            <div
              className="
                p-8
                rounded-3xl
                bg-white/[0.03]
                border
                border-white/[0.05]
              "
            >
              <h2 className="text-5xl font-black">99.9%</h2>

              <p className="text-gray-500 mt-3">Platform Uptime</p>
            </div>
          </div>

          <div
            className="
              grid
              lg:grid-cols-2
              2xl:grid-cols-3
              gap-8
            "
          >
            {polls.map((poll) => (
              <div
                key={poll._id}
                className="
                  relative
                  overflow-hidden
                  rounded-[35px]
                  border
                  border-white/[0.06]
                  bg-gradient-to-b
                  from-white/[0.04]
                  to-white/[0.02]
                  backdrop-blur-2xl
                  p-8
                  hover:border-cyan-500/20
                  hover:-translate-y-2
                  transition-all
                  duration-500
                  group
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    bg-gradient-to-r
                    from-cyan-500/5
                    to-purple-600/5
                  "
                />

                <div className="relative z-10">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-8
                    "
                  >
                    <div
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-white/[0.04]
                        border
                        border-white/[0.05]
                        text-xs
                        tracking-wide
                        text-gray-400
                      "
                    >
                      LIVE POLL
                    </div>

                    {poll.isPublished && (
                      <div
                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-emerald-500/10
                          border
                          border-emerald-500/20
                          text-emerald-400
                          text-xs
                        "
                      >
                        PUBLISHED
                      </div>
                    )}
                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      leading-tight
                      mb-4
                    "
                  >
                    {poll.title}
                  </h2>

                  <p
                    className="
                      text-gray-500
                      leading-relaxed
                      mb-10
                    "
                  >
                    {poll.description}
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mb-10
                    "
                  >
                    <div
                      className="
                        flex-1
                        p-4
                        rounded-2xl
                        bg-white/[0.03]
                        border
                        border-white/[0.05]
                      "
                    >
                      <h3 className="text-2xl font-bold">
                        {poll.questions?.length}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">Questions</p>
                    </div>

                    <div
                      className="
                        flex-1
                        p-4
                        rounded-2xl
                        bg-white/[0.03]
                        border
                        border-white/[0.05]
                      "
                    >
                      <h3 className="text-2xl font-bold">Live</h3>

                      <p className="text-gray-500 text-sm mt-1">Status</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => navigate(`/poll/${poll._id}`)}
                      className="
                        w-full
                        py-4
                        rounded-2xl
                        bg-white
                        text-black
                        font-semibold
                        hover:scale-[1.02]
                        transition-all
                      "
                    >
                      Open Poll
                    </button>

                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => navigate(`/poll/${poll._id}/results`)}
                        className="
                          py-3
                          rounded-2xl
                          bg-white/[0.04]
                          border
                          border-white/[0.05]
                          hover:bg-white/[0.08]
                          transition-all
                        "
                      >
                        Results
                      </button>

                      <button
                        onClick={() => handlePublishResults(poll._id)}
                        className="
                          py-3
                          rounded-2xl
                          bg-cyan-500/10
                          border
                          border-cyan-500/20
                          text-cyan-400
                          hover:bg-cyan-500/20
                          transition-all
                        "
                      >
                        Publish
                      </button>

                      <button
                        onClick={() => handleDeletePoll(poll._id)}
                        className="
                          py-3
                          rounded-2xl
                          bg-red-500/10
                          border
                          border-red-500/20
                          text-red-400
                          hover:bg-red-500/20
                          transition-all
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
