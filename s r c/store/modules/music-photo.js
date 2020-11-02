import home from "../../api/home";
let BASE_URL = window.apiHost;

const state = () => ({
  totalCount: 0, // 分页数据总条数
  musicList: [],
  categoryData: []
});

const getters = {
  musicList: state => {
    return state.musicList.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath,
        title: item.title,
        author: item.author,
        creationTime: item.creationTime,
        filePath: item.filePath
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
  getMusicPhotoList({ state, commit }, params) {
    const list = [...state.musicList];
    commit("setMusicList", { musicList: [] });
    home.getCertainPageList(
      params,
      data => {
        commit("setMusicList", { musicList: data.items });
        commit("setTotalCount", { totalCount: data.totalCount });
      },
      () => commit("setMusicList", { musicList: list })
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
  setMusicList(state, { musicList }) {
    state.musicList = musicList;
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
