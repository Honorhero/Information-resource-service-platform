// import Axios from "axios";
import instance from "@/utils/http";
let BASE_URL = window.apiHost;

export default {
  // 获取首页数据的接口
  async getHomePageList(params, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/BusinessAPI/Webs/GetList`,
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

  // 获取首页单个(视频课程、电子图书...)的详情数据接口
  async getHomePageListItemDetail(params, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/BusinessAPI/Webs`,
        // eslint-disable-next-line prettier/prettier
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
  },

  // 获取除首页菜单外的其余菜单分页数据的接口
  async getCertainPageList(params, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/BusinessAPI/Webs/GetList`,
        // eslint-disable-next-line prettier/prettier
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
  },

  // 获取分类数据集
  async getResourceCategories(params, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/BusinessAPI/ResourceCategories/GetList`,
        // eslint-disable-next-line prettier/prettier
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
  },

  // 获取推荐课程数据集
  async getRecommandList(params, id, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/BusinessAPI/Webs/Recommend/${id}`,
        // eslint-disable-next-line prettier/prettier
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
