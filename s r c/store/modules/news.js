import home from "../../api/home";
let BASE_URL = window.apiHost;

const state = () => ({
  totalCount: 0, // 分页数据总条数
  newsList: [],
  categoryData: []
});

const getters = {
  newsList: state => {
    return state.newsList.map(item => {
      return {
        id: item.id,
        title: item.title, // 新闻标题
        simpleInfo: [
          {
            title: "作者",
            info: item.author
          },
          {
            title: "分类",
            info: item.categoryName
          },
          // {
          //   title: "课时",
          //   info: "4"
          // },
          {
            title: "发布时间",
            info: item.publishDate
          }
        ],
        author: item.author, // 作者
        // categoryName: item.categoryName, // 分类
        descs: item.descs, // 简介
        filePath: BASE_URL + item.filePath // 文件路径
        // creationTime: item.creationTime
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
  }
};

const actions = {
  // 获取音乐图片数据
  getNewsList({ state, commit }, params) {
    const list = [...state.newsList];
    commit("setNewsList", { newsList: [] });
    home.getCertainPageList(
      params,
      data => {
        commit("setNewsList", { newsList: data.items });
        commit("setTotalCount", { totalCount: data.totalCount });
      },
      () => commit("setNewsList", { newsList: list })
    );
  },

  // 获取电子图书分类数据集
  getResourceCategory({ state, commit }, params) {
    const list = [...state.categoryData];
    commit("setCategoryData", { categoryData: [] });
    home.getResourceCategories(
      params,
      data => commit("setCategoryData", { categoryData: data }),
      () => commit("setCategoryData", { categoryData: list })
    );
  }
};

const mutations = {
  setNewsList(state, { newsList }) {
    state.newsList = newsList;
  },

  setTotalCount(state, { totalCount }) {
    state.totalCount = totalCount;
  },

  setCategoryData(state, { categoryData }) {
    state.categoryData = categoryData;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
