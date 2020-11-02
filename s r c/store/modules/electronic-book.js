import home from "../../api/home";
let BASE_URL = window.apiHost;

const state = () => ({
  totalCount: 0, // 分页数据总条数
  bookList: [],
  categoryData: []
});

const getters = {
  bookList: state => {
    return state.bookList.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath,
        title: item.title
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
  // 获取电子图书数据
  getElectronicBooksList({ state, commit }, params) {
    const list = [...state.bookList];
    commit("setBooksList", { bookList: [] });
    home.getCertainPageList(
      params,
      data => {
        commit("setBooksList", { bookList: data.items });
        commit("setTotalCount", { totalCount: data.totalCount });
      },
      () => commit("setBooksList", { bookList: list })
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
  setBooksList(state, { bookList }) {
    state.bookList = bookList;
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
