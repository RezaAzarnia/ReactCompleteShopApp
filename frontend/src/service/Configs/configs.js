import axios from "axios";
const baseURL = axios.create({
  baseURL: "https://alpusshopdatabase.liara.run/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Response interceptor
baseURL.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code == "ECONNABORTED") {
      return Promise.reject("خطا در برقراری ارتباط");
    } else if (error.code == "ERR_NETWORK") {
      return Promise.reject("خطا در برقراری ارتباط");
    } else {
      return Promise.reject("خطا در برقراری ارتباط");
    }
  }
);

const handleResponse = (response, responseMessage) => {
  if (response.status >= 200 && response.status < 300) {
    return { status: 200, message: responseMessage };
  } else {
    throw {
      status: response.status,
      message: response.statusText,
    };
  }
};
export { handleResponse, baseURL };
