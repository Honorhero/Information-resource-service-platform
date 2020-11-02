import instance from "../utils/http";
import Axios from "axios";
// const USER_API = window.userApiHost;
const BASE_URL = window.apiHost;
// const EXAM_URL = window.examApiHost;

export default {
  // 登录
  async login(params, cb, errorCb) {
    try {
      let res = await instance.post(`${BASE_URL}/connect/token`, params);
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error_description);
      }
    } catch (error) {
      throw error.data.error_description;
    }
  },

  // 获取登录用户信息
  async getUserInfo(params, cb, errorCb) {
    try {
      let res = await instance.get(`${BASE_URL}/api/app/profileExt`);
      if (res.status === 200) {
        cb(res.status && res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.data.error.message);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 注册
  async register(params, cb, errorCb) {
    try {
      let res = await Axios.post(`${BASE_URL}/api/account/register`, params);
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 修改用户信息
  async changeUserInfo(params, cb, errorCb) {
    try {
      let res = await instance.put(
        `${BASE_URL}/api/identity/my-profile`,
        params
      );
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 上传用户头像
  async uploadAvatar(params, cb, errorCb) {
    try {
      let res = await instance.post(
        `${BASE_URL}/api/app/profileExt/UpdateImages`,
        params
      );
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 修改用户密码
  async changeUserPwd(params, cb, errorCb) {
    try {
      let res = await instance.post(
        `${BASE_URL}/api/identity/my-profile/change-password`,
        params
      );
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      if (error.status && error.status === 204) {
        cb();
      } else {
        error.data && errorCb(error.data.error.message);
      }
      throw "请求错误" + error;
    }
  },

  // 获取用户的浏览记录
  async getUserBrowseRecords(params, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/BusinessAPI/MyBrowseRecords/GetList`,
        { params }
      );
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 获取用户的收藏记录
  async getUserCollectionRecords(params, cb, errorCb) {
    try {
      let res = await instance.get(
        `${BASE_URL}/api/BusinessAPI/MyCollectRecord/GetList`,
        { params }
      );
      if (res.status && res.status === 200) {
        cb(res.data); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 删除用户的收藏记录
  async deleteMyCollectRecord(params, cb, errorCb) {
    try {
      let res = await instance.delete(
        `${BASE_URL}/api/BusinessAPI/MyCollectRecord`,
        { params }
      );
      if (res.status && res.status === 200) {
        cb(); // 回调函数
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      if (error.status && error.status === 204) {
        cb();
      } else {
        error.data && errorCb(error.data.error.message);
      }
      throw "请求错误" + error;
    }
  },

  // 收藏
  async collect(params, cb, errorCb) {
    try {
      let res = await instance.post(
        `${BASE_URL}/api/BusinessAPI/MyCollectRecord`,
        params
      );
      if (res.status && res.status === 200) {
        cb(res.data);
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  },

  // 创建用户考试记录
  async createTestRecord(params, cb, errorCb) {
    try {
      let res = await instance.post(
        `${BASE_URL}/api/TH.ExamAPI/UserJoinPaper/CreateUserRecord`,
        params
      );
      if (res.status && res.status === 200) {
        cb(res.data);
      } else {
        errorCb();
        throw new Error(res.data.error.message);
      }
    } catch (error) {
      error.data && errorCb(error.data.error.message);
      throw "请求错误" + error;
    }
  }
};
