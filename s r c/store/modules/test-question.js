import exam from "../../api/exam";
import user from "../../api/user";
import { Notification } from "element-ui";

const state = () => ({
  totalCount: 0, // 分页数据总条数
  paperQuestionList: [],
  paperInfo: {}
});

const getters = {
  questionList: state => state.paperQuestionList,

  totalCount: state => state.totalCount,

  paperInfo: state => state.paperInfo
};

const actions = {
  // 获取试卷的题目信息
  getPaperQuestionList({ state, commit }, params) {
    const list = [...state.paperQuestionList];
    commit("setPaperQuestionList", { paperQuestionList: [] });
    exam.getPaperQuery(
      params,
      data => {
        commit("setPaperQuestionList", { paperQuestionList: data.items });
        commit("setTotalCount", { totalCount: data.totalCount });
      },
      () => commit("setPaperQuestionList", { paperQuestionList: list })
    );
  },

  // 获取试卷详情信息
  getPaperInfo({ state, commit }, params) {
    const info = { ...state.paperInfo };
    commit("setPaperInfo", { paperInfo: [] });
    exam.paperInfo(
      params,
      data => commit("setPaperInfo", { paperInfo: data }),
      () => commit("setPaperInfo", { paperInfo: info })
    );
  },

  // 创建一条当前用户的考试记录
  // eslint-disable-next-line no-unused-vars
  createUserTestRecord({ commit }, params) {
    user.createTestRecord(
      params,
      () => {
        Notification({
          title: "成功",
          type: "success",
          message: "交卷成功"
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
  setPaperQuestionList(state, { paperQuestionList }) {
    state.paperQuestionList = paperQuestionList;
  },

  setTotalCount(state, { totalCount }) {
    state.totalCount = totalCount;
  },

  setPaperInfo(state, { paperInfo }) {
    state.paperInfo = paperInfo;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
