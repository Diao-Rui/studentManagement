import serviceAxios from "../index";

export const login = (data) => {
  return serviceAxios({
    url: "/login",
    method: "post",
    data,
  });
};
export const register = (data) => {
  return serviceAxios({
    url: "/register",
    method: "post",
    data,
  });
};
export const delUser = (parms) => {
  return serviceAxios({
    url: "/delUser",
    method: "get",
    parms,
  });
};
export const findAllUser = () => {
  return serviceAxios({
    url: "/findAllUser",
    method: "get",
  });
};
export const empower = (data) => {
  return serviceAxios({
    url: "/empower",
    method: "post",
    data,
  });
};
