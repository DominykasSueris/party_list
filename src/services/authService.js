import axios from "axios";

const apiUrl = "https://itacademy-todo-api-test.herokuapp.com/api/login";

export const login = (username, password) => {
  return axios.get(apiUrl, {
    auth: {
      username,
      password
    }
  });
};
