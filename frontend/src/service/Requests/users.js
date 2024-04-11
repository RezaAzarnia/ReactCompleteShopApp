import { baseURL, handleResponse } from "../Configs/configs";
let users = [];
const getUsers = async () => {
  try {
    const response = await baseURL.get("/users");
    users = [...response.data];
  } catch (error) {
    throw error;
  }
};

const registerUser = async (data) => {
  try {
    await getUsers();
    const isUserExist = users.find(
      (user) => user.username === data.username || user.email === data.email
    );
    if (isUserExist) {
      return Promise.reject("کاربری با این نام کاربری و ایمیل وجود دارد");
    }
    const response = await baseURL.post("/users", { ...data });
    return handleResponse(response, "ثبت نام با موفقیت انجام شد");
  } catch (error) {
    throw error;
  }
};
const LoginUser = async (data) => {
  const { email, loginPassword } = data;
  try {
    await getUsers();
    const findUser = users.find(
      (user) => user.email === email && user.password === loginPassword
    );
    if (!findUser) {
      return Promise.reject("نام کاربری یا رمز عبور اشتباه است");
    }
    return { status: 200, userInfo: findUser };
  } catch (error) {
    throw error;
  }
};

export { registerUser, LoginUser };
