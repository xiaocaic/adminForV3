import axios from "@/utils/axios";

//lodaing配置
export const xPoet = (params?: any): Promise<any> =>
  axios.get(
    "/users/XPoet",
    { params }
  ); 

// 文件下载
export const exportGoods = (data?: any) =>
  axios.post(
    "/export",
    data,
    { responseType: "blob", }
  );
