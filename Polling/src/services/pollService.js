import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/api/polls";

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
    import.meta.env.VITE_API_URL + "/api/responses",

    responseData,

    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  );
};

export const getPollResults = async (pollId) => {
  return await axios.get(
    import.meta.env.VITE_API_URL + `/api/polls/${pollId}/results`,
  );
};

export const deletePoll = async (pollId) => {
  const token = localStorage.getItem("token");

  return await axios.delete(`${API}/${pollId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const publishResults = async (pollId) => {
  const token = localStorage.getItem("token");

  return await axios.patch(
    `${API}/${pollId}/publish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
