import axios from "@/utils/axios";

//lodaing配置
export const xPoet = (params?: any): Promise<any> =>
  axios.get(
    "/api/users/XPoet", //如配置了不同的代理，适用方法如下："/base/users/XPoet"
    { params }
  ); 

// 文件下载
export const exportGoods = (data?: any) =>
  axios.post(
    "/export",
    data,
    { responseType: "blob", }
  );
