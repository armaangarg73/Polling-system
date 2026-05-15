import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getPollResults, getSinglePoll } from "../services/pollService";
import { io } from "socket.io-client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const PollResults = () => {
  const { id } = useParams();

  const COLORS = ["#22d3ee", "#3b82f6", "#8b5cf6", "#e879f9"];

  const [results, setResults] = useState(null);

  const [poll, setPoll] = useState(null);

  const isExpired = poll?.expiresAt && new Date() > new Date(poll.expiresAt);

  const fetchResults = useCallback(async () => {
    try {
      const response = await getPollResults(id);
      setResults(response.data);
      const pollResponse = await getSinglePoll(id);

      setPoll(pollResponse.data);
    } catch (error) {
       console.error("Failed to fetch poll analytics:", error.message);
    }
  }, [id]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);

    setTimeout(() => {
      fetchResults();
    }, 0);

    socket.on(`pollUpdated-${id}`, fetchResults);

    return () => {
      socket.off(`pollUpdated-${id}`, fetchResults);

      socket.disconnect();
    };
  }, [id]);

  if (!results) {
    return (
      <div
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        "
      >
        <h1 className="text-5xl font-black">Loading Analytics...</h1>
      </div>
    );
  }
  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        p-8
        relative
        overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className="
            mb-14
            p-10
            rounded-[40px]
            bg-white/[0.04]
            border
            border-white/[0.08]
            backdrop-blur-2xl
          "
        >
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
              mb-8
            "
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

            <span className="text-sm text-gray-400">
              Live Realtime Analytics
            </span>
          </div>

          <h1
            className="
              text-6xl
              lg:text-8xl
              font-black
              leading-none
              tracking-tight
              mb-6
            "
          >
            Audience
            <span
              className="
                block
                bg-gradient-to-r
                from-cyan-400
                via-blue-400
                to-purple-500
                text-transparent
                bg-clip-text
              "
            >
              Intelligence
            </span>
          </h1>

          <p className="text-gray-500 text-xl max-w-2xl">
            Realtime audience insights, engagement metrics and live response
            analytics powered by Socket.IO infrastructure.
          </p>
        </div>

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
              rounded-[35px]
              bg-white/[0.04]
              border
              border-white/[0.08]
              backdrop-blur-2xl
            "
          >
            <h2 className="text-6xl font-black">{results.totalResponses}</h2>

            <p className="text-gray-500 mt-4">Total Responses</p>
          </div>

          <div
            className="
              p-8
              rounded-[35px]
              bg-white/[0.04]
              border
              border-white/[0.08]
              backdrop-blur-2xl
            "
          >
            <h2
              className={`
                    text-5xl
                    font-black
                    
                    ${isExpired ? "text-red-400" : "text-cyan-400"}`}
            >
              {isExpired ? "EXPIRED" : "LIVE"}
            </h2>

            <p className="text-gray-500 mt-4">Streaming Status</p>
          </div>

          <div
            className="
              p-8
              rounded-[35px]
              bg-white/[0.04]
              border
              border-white/[0.08]
              backdrop-blur-2xl
            "
          >
            <h2 className="text-6xl font-black text-purple-400">
              {results.results.length}
            </h2>

            <p className="text-gray-500 mt-4">Questions</p>
          </div>

          <div
            className="
              p-8
              rounded-[35px]
              bg-white/[0.04]
              border
              border-white/[0.08]
              backdrop-blur-2xl
            "
          >
            <h2 className="text-6xl font-black text-emerald-400">99%</h2>

            <p className="text-gray-500 mt-4">Engagement Rate</p>
          </div>
        </div>

        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
            mb-14
          "
        >
          {results.results.map((result, index) => {
            const chartData = Object.entries(result.optionCounts).map(
              ([option, count]) => ({
                name: option,
                value: count,
              }),
            );

            return (
              <div
                key={index}
                className="
                    p-8
                    rounded-[40px]
                    bg-white/[0.04]
                    border
                    border-white/[0.08]
                    backdrop-blur-2xl
                  "
              >
                <h2
                  className="
                      text-3xl
                      font-black
                      mb-10
                    "
                >
                  {result.question}
                </h2>

                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                      >
                        {chartData.map((entry, chartIndex) => (
                          <Cell
                            key={chartIndex}
                            fill={COLORS[chartIndex % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="
            p-10
            rounded-[40px]
            bg-white/[0.04]
            border
            border-white/[0.08]
            backdrop-blur-2xl
            mb-14
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              mb-10
            "
          >
            <div>
              <h2 className="text-4xl font-black">Response Distribution</h2>

              <p className="text-gray-500 mt-2">
                Audience participation overview.
              </p>
            </div>

            <div
              className={`
              px-4
              py-2
              rounded-full
              border
              text-sm
              font-semibold

              ${
                isExpired
                  ? `
                    bg-red-500/10
                    border-red-500/20
                    text-red-400
                  `
                  : `
                    bg-emerald-500/10
                    border-emerald-500/20
                    text-emerald-400
                  `
              }
            `}
            >
              {isExpired ? "EXPIRED" : "LIVE"}
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  results.results[0]
                    ? Object.entries(results.results[0].optionCounts).map(
                        ([option, count]) => ({
                          option,
                          votes: count,
                        }),
                      )
                    : []
                }
              >
                <XAxis dataKey="option" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="votes" radius={[12, 12, 0, 0]} fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          {results.results.map((result, index) => (
            <div
              key={index}
              className="
                  p-10
                  rounded-[40px]
                  bg-white/[0.04]
                  border
                  border-white/[0.08]
                  backdrop-blur-2xl
                "
            >
              <h2
                className="
                    text-4xl
                    font-black
                    mb-10
                  "
              >
                {result.question}
              </h2>

              <div className="space-y-8">
                {Object.entries(result.optionCounts).map(([option, count]) => {
                  const percentage = results.totalResponses
                    ? ((count / results.totalResponses) * 100).toFixed(1)
                    : 0;

                  const maxVotes = Math.max(
                    ...Object.values(result.optionCounts),
                  );

                  const isWinner = count === maxVotes && count > 0;

                  return (
                    <div key={option}>
                      <div
                        className="
                              flex
                              items-center
                              justify-between
                              mb-4
                            "
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="
                                  text-2xl
                                  font-bold
                                "
                          >
                            {option}
                          </span>

                          {isWinner && (
                            <span
                              className="
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-yellow-400/10
                                    border
                                    border-yellow-400/20
                                    text-yellow-300
                                    text-sm
                                    font-bold
                                  "
                            >
                              Top Voted
                            </span>
                          )}
                        </div>

                        <span
                          className="
                                text-cyan-400
                                font-black
                                text-xl
                              "
                        >
                          {count} votes ({percentage}%)
                        </span>
                      </div>

                      <div
                        className="
                              w-full
                              h-6
                              rounded-full
                              bg-white/10
                              overflow-hidden
                            "
                      >
                        <div
                          className={`
                                h-full
                                rounded-full
                                transition-all
                                duration-700

                                ${
                                  isWinner
                                    ? `
                                      bg-gradient-to-r
                                      from-yellow-400
                                      via-cyan-400
                                      to-purple-500
                                    `
                                    : `
                                      bg-gradient-to-r
                                      from-cyan-500
                                      to-purple-600
                                    `
                                }
                              `}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PollResults;
