import serviceAxios from "../index";

export const addType = (data) => {
  return serviceAxios({
    url: "/addType",
    method: "post",
    data,
  });
};
export const delType = (data) => {
  return serviceAxios({
    url: "/delType",
    method: "post",
    data,
  });
};
export const findAllType = () => {
  return serviceAxios({
    url: "/findAllType",
    method: "get",
  });
};
