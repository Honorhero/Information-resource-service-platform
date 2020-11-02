// import Axios from "axios";
import instance from "@/utils/http";
let BASE_URL = window.apiHost;

export default {
  // 获取首页测试题库数据的接口
  async getPaperInfo(params, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/TH.ExamAPI/PaperInfo/QueryAll`,
        // eslint-disable-next-line prettier/prettier
        { params }
      );
      if (res.status && res.status === 200) {
        cb(res.data.items); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 获取试卷详情信息数据
  async paperInfo(params, cb, errorCb) {
    try {
      let res = await instance.get(`${BASE_URL}/api/TH.ExamAPI/PaperInfo`, {
        params
      });
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 获取试卷的题目详情数据
  async getPaperQuery(params, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/TH.ExamAPI/PaperTest/GetPaperTestQuery`,
        { params }
      );
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  }
};
