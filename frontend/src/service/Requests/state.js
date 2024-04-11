import { baseURL } from "../Configs/configs";
const getCountryStates = async () => {
  try {
    const response = await baseURL.get("/states");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getCountryStates };
