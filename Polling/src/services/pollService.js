import axios from "axios";

const API = "http://localhost:5000/api/polls";

export const createPoll = async (pollData) => {
  const token = localStorage.getItem("token");

  return axios.post(API, pollData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserPolls = async () => {
  const token = localStorage.getItem("token");

  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSinglePoll = async (id) => {
  return await axios.get(`${API}/${id}`);
};

export const submitResponse = async (responseData) => {
  const token = localStorage.getItem("token");

  return await axios.post(
    "http://localhost:5000/api/responses",

    responseData,

    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  );
};
