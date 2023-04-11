import serviceAxios from "../index";

export const addOccupation = (data) => {
  return serviceAxios({
    url: "/addOccupation",
    method: "post",
    data,
  });
};
export const delOccupation = (data) => {
  return serviceAxios({
    url: "/delOccupation",
    method: "post",
    data,
  });
};

export const findAllOccupation = () => {
  return serviceAxios({
    url: "/findAllOccupation",
    method: "get",
  });
};
