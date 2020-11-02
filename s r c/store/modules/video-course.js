// import Axios from "axios";
import home from "../../api/home";
let BASE_URL = window.apiHost;

const state = () => ({
  totalCount: 0, // 分页数据总条数
  videoCourseList: [],
  categoryData: [],
  recommandList: [] // 推荐课程
});

const getters = {
  videoCourseList: state => {
    return state.videoCourseList.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath, // 视频课程图片
        title: item.title, // 视频课程标题
        author: item.author, // 作者
        volume: item.volume, // 视频课程节数
        price: item.resPrice, // 价格
        readCount: item.readCount, // 报名人数
        descs: item.descs // 简介
      };
    });
  },

  totalCount: state => state.totalCount,

  categoryData: state => {
    const data = state.categoryData.filter(el => el.parentId > 10);
    data.unshift({
      name: "全部",
      parentId: -1,
      id: ""
    });
    return data;
  },

  recommandList: state => {
    return state.recommandList.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath,
        title: item.title,
        name: item.name, // 视频名称
        filePath: BASE_URL + item.filePath, // 视频播放地址路径
        volume: item.volume,
        author: item.author,
        price: item.resPrice,
        readCount: item.readCount
      };
    });
  }
};

const actions = {
  // 获取视频课程数据
  getVideoCourseList({ state, commit }, params) {
    const list = [...state.videoCourseList];
    commit("setVideoCourseList", { videoCourseList: [] });
    home.getCertainPageList(
      params,
      data => {
        commit("setVideoCourseList", { videoCourseList: data.items });
        commit("setTotalCount", { totalCount: data.totalCount });
      },
      () => commit("setVideoCourseList", { videoCourseList: list })
    );
  },

  // 获取分类数据集
  getResourceCategory({ state, commit }, params) {
    const list = [...state.categoryData];
    commit("setCategoryData", { categoryData: [] });
    home.getResourceCategories(
      params,
      data => commit("setCategoryData", { categoryData: data }),
      () => commit("setCategoryData", { categoryData: list })
    );
  },

  // 获取推荐课程
  getRecommandCourse({ state, commit }, params) {
    // 参数特殊处理
    const id = params.id;
    let newParams = {};
    for (let key of Object.keys(params)) {
      if (key !== "id") {
        newParams[key] = params[key];
      }
    }

    const list = [...state.recommandList];
    commit("setRecommandCourseData", { recommandList: [] });
    home.getRecommandList(
      newParams,
      id,
      data => commit("setRecommandCourseData", { recommandList: data }),
      () => commit("setRecommandCourseData", { recommandList: list })
    );
  }
};

const mutations = {
  setVideoCourseList(state, { videoCourseList }) {
    state.videoCourseList = videoCourseList;
  },

  setTotalCount(state, { totalCount }) {
    state.totalCount = totalCount;
  },

  setCategoryData(state, { categoryData }) {
    state.categoryData = categoryData;
  },

  setRecommandCourseData(state, { recommandList }) {
    state.recommandList = recommandList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
