import home from "../../api/home";
let BASE_URL = window.apiHost;

const state = () => ({
  totalCount: 0, // 分页数据总条数
  documentList: [],
  categoryData: []
});

const getters = {
  documentList: state => {
    return state.documentList.map(item => {
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
        descs: item.descs, // 简介
        filePath: BASE_URL + item.filePath // 文件路径
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
  // 获取数字文献数据
  getDocumentList({ state, commit }, params) {
    const list = [...state.documentList];
    commit("setDocumentList", { documentList: [] });
    home.getCertainPageList(
      params,
      data => {
        commit("setDocumentList", { documentList: data.items });
        commit("setTotalCount", { totalCount: data.totalCount });
      },
      () => commit("setDocumentList", { documentList: list })
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
  setDocumentList(state, { documentList }) {
    state.documentList = documentList;
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
