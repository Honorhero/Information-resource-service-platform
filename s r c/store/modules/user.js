import user from "../../api/user";
import { setToken, removeToken } from "@/utils/auth";
import { Notification } from "element-ui";
// const USER_API = window.userApiHost;
const BASE_URL = window.apiHost;

const state = () => ({
  loginSuccess: null, // 登录成功
  token: "", // token
  userInfo: {}, // 用户信息
  errorMsg: "", // 登录错误返回的错误信息
  registerSuccess: false, // 注册成功
  registerErrorMsg: "", // 注册失败返回的错误信息
  browseTotalCount: 0, // 浏览记录总数
  collectionTotalCount: 0, // 收藏记录总数
  deleteRecordSuccess: false, // 删除用户浏览记录是否成功

  browseRecordsList: [], // 用户浏览记录
  collectionRecordsList: [] // 用户收藏记录
});

const getters = {
  token: state => state.token,
  errorMsg: state => state.errorMsg,

  userInfo: state => {
    const info = state.userInfo;
    return {
      id: info.id,
      avatarImage: BASE_URL + info.images, // 用户头像
      userName: info.userName, // 用户名
      name: info.name, // 用户名称
      surname: info.surname, // 用户昵称
      email: info.email, // 用户邮箱
      phoneNumber: info.phoneNumber, // 用户电话号码
      extraProperties: info.extraProperties // 额外的一些用户信息
    };
  },

  registerSuccess: state => state.registerSuccess,
  registerErrorMsg: state => state.registerErrorMsg,

  browseRecords: state => state.browseRecordsList,

  collectionRecords: state => state.collectionRecordsList,

  browseTotalCount: state => state.browseTotalCount,
  collectionTotalCount: state => state.collectionTotalCount,
  deleteRecordSuccess: state => state.deleteRecordSuccess
};

const actions = {
  // 登录
  login({ commit }, params) {
    commit("setLoginFail", "");
    user
      .login(
        params,
        data => {
          // commit("setLoginSuccess", true);
          commit("setToken", data.access_token);
          setToken(data.access_token);
          // Notification({
          //   title: "成功",
          //   type: "success",
          //   message: "登录成功"
          // });
        },
        () => {
          // commit("setLoginSuccess", false);
          commit("setToken", "");
          removeToken();
        }
      )
      .catch(error => {
        commit("setToken", "");
        commit("setLoginFail", error);
      });
  },

  // 获取登录的用户信息
  getUserInfo({ state, commit }, params) {
    const list = { ...state.userInfo };
    user.getUserInfo(
      params,
      data => {
        commit("setUserInfo", data);
        sessionStorage.setItem("userInfo", JSON.stringify(data)); // 将登录用户的信息存在sessionStorage中
      },
      () => commit("setUserInfo", list)
    );
  },

  // 注册
  registerNewAccount({ commit }, params) {
    commit("setRegisterSuccess", false);
    commit("setErrorMsg", "");
    user.register(
      params,
      () => {
        commit("setRegisterSuccess", true);
        Notification({
          title: "成功",
          type: "success",
          message: "注册成功"
        });
      },
      error => {
        commit("setRegisterSuccess", false);
        commit("setErrorMsg", error.message);
      }
    );
  },

  // 修改用户信息
  changeUserInfo({ state, commit }, params) {
    const list = { ...state.userInfo };
    user.changeUserInfo(
      params,
      data => {
        commit("setUserInfo", data);
        Notification({
          title: "成功",
          type: "success",
          message: "修改用户信息成功"
        });
      },
      error => {
        commit("setUserInfo", list);
        Notification({
          title: "失败",
          type: "error",
          message: error
        });
      }
    );
  },

  // 修改用户头像
  // eslint-disable-next-line no-unused-vars
  uploadUserAvatar({ commit }, params) {
    user.uploadAvatar(
      params,
      () => {
        Notification({
          title: "成功",
          type: "success",
          message: "修改头像成功"
        });
      },
      error => {
        Notification({
          title: "失败",
          type: "error",
          message: error
        });
      }
    );
  },

  // 修改用户密码
  // eslint-disable-next-line no-unused-vars
  changeUserPwd({ commit }, params) {
    user.changeUserPwd(
      params,
      () => {
        Notification({
          title: "成功",
          type: "success",
          message: "修改密码成功，重新登录后生效"
        });
      },
      error => {
        Notification({
          title: "失败",
          type: "error",
          message: error
        });
      }
    );
  },

  // 获取用户浏览记录
  getBrowseRecords({ state, commit }, params) {
    const list = [...state.browseRecordsList];
    commit("setBrowseRecords", { recordsList: [] });
    commit("setBrowseTotalCount", { totalCount: 0 });
    user.getUserBrowseRecords(
      params,
      data => {
        commit("setBrowseRecords", { recordsList: data.items });
        commit("setBrowseTotalCount", { totalCount: data.totalCount });
      },
      () => commit("setBrowseRecords", { list })
    );
  },

  // 获取用户收藏记录
  getCollectionRecords({ state, commit }, params) {
    const list = [...state.collectionRecordsList];
    commit("setCollectioncords", { recordsList: [] });
    commit("setCollectionTotalCount", { totalCount: 0 });
    user.getUserCollectionRecords(
      params,
      data => {
        commit("setCollectioncords", { recordsList: data.items });
        commit("setCollectionTotalCount", { totalCount: data.totalCount });
      },
      () => commit("setCollectioncords", { list })
    );
  },

  // 删除用户收藏记录 单条删除
  deleteCollectionRecord({ commit }, params) {
    commit("setDeleteCollectionRecord", false);
    user.deleteMyCollectRecord(
      params,
      () => {
        commit("setDeleteCollectionRecord", true);
        Notification({
          title: "成功",
          type: "success",
          message: "删除成功"
        });
      },
      error => {
        Notification({
          title: "错误",
          type: "error",
          message: error
        });
      }
    );
  },

  // 用户登录后收藏资源
  // eslint-disable-next-line no-unused-vars
  collectResource({ commit }, params) {
    user.collect(
      params,
      () => {
        Notification({
          title: "成功",
          type: "success",
          message: "收藏资源成功"
        });
      },
      error => {
        Notification({
          title: "失败",
          type: "error",
          message: error
        });
      }
    );
  }
};

const mutations = {
  // setLoginSuccess(state, loginSuccess) {
  //   state.loginSuccess = loginSuccess;
  // },

  setLoginFail(state, msg) {
    state.errorMsg = msg;
  },

  setToken(state, token) {
    state.token = token;
  },

  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },

  setRegisterSuccess(state, registerSuccess) {
    state.registerSuccess = registerSuccess;
  },

  setErrorMsg(state, msg) {
    state.registerErrorMsg = msg;
  },

  setBrowseRecords(state, { recordsList }) {
    state.browseRecordsList = recordsList;
  },

  setCollectioncords(state, { recordsList }) {
    state.collectionRecordsList = recordsList;
  },

  setBrowseTotalCount(state, { totalCount }) {
    state.browseTotalCount = totalCount;
  },

  setCollectionTotalCount(state, { totalCount }) {
    state.collectionTotalCount = totalCount;
  },

  setDeleteCollectionRecord(state, deleteSuccess) {
    state.deleteRecordSuccess = deleteSuccess;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
