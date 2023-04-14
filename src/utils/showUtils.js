// 导入Message
import { Message } from "element-ui";
// 提示工具类
export const showResult = (res) => {
  if (res.code === "200") {
    Message({
      type: "success",
      message: res.message,
    });
  } else {
    Message({
      type: "error",
      message: res.message,
    });
  }
};
