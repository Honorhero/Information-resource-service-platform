import home from "../../api/home";
import exam from "../../api/exam";
let BASE_URL = window.apiHost;

const state = () => ({
  bannerList: [], // 轮播图
  videoCourseList: [], // 视频课程
  electronicBooksList: [], // 电子图书
  digitalDocumentList: [], // 数字文献
  questionBankList: [], // 测试题库
  newsList: [], // 新闻资讯
  musicPicturesList: [], // 音乐图片
  experts: [], // 专家

  videoCourseInfo: {}, // 视频课程详情
  bookInfo: {}, // 电子图书详情
  documentInfo: {}, // 数字文献详情
  newsInfo: {}, // 新闻资讯详情

  searchResultList: [] // 搜索结果
});

const getters = {
  bannerData: state => {
    return state.bannerList.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath, // 轮播图片地址
        backgroundColor: item.language // 轮播图图片背景色
      };
    });
  },

  videoCourse: state => {
    return state.videoCourseList.map(item => {
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
  },

  videoCourseInfo: state => {
    const info = state.videoCourseInfo;
    return {
      id: info.id,
      mainImgPath: BASE_URL + info.mainImgPath, // 视频播放器默认封面图片
      descs: info.descs, // 简介
      author: info.author, // 作者
      name: info.name, // 名称
      resourceType: info.resourceType // 资源类型
    };
  },

  electronicBooks: state => {
    return state.electronicBooksList.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath,
        title: item.title
      };
    });
  },

  bookInfo: state => {
    const info = state.bookInfo;
    return {
      id: info.id,
      mainImgPath: BASE_URL + info.mainImgPath, // 图片路径
      title: info.title, // 书名
      name: info.name,
      author: info.author, // 作者
      authorOrganization: info.authorOrganization, // 出版社
      creationTime: info.creationTime, // 出版时间
      totalPage: info.totalPage, // 页数
      descs: info.descs, // 简介
      filePath: BASE_URL + info.filePath, // 文件路径 用于在线阅读、下载按钮点击打开新标签页
      resourceType: info.resourceType
    };
  },

  digitalDocument: state => {
    return state.digitalDocumentList.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath,
        title: item.title,
        price: item.resPrice,
        readCount: item.readCount
      };
    });
  },

  documentInfo: state => {
    const info = state.documentInfo;
    return {
      id: info.id,
      title: info.title, // 文献名称
      price: info.resPrice, // 价格(0: 免费)
      readCount: info.readCount, // 报名人数
      descs: info.descs, // 简介
      author: info.author, // 作者
      publishDate: info.publishDate, // 年
      volume: info.volume, // 卷
      name: info.name, // 刊名
      authorOrganization: info.authorOrganization, // 作者机构
      publishShop: info.publishShop, // 所属刊期栏目
      publishTime: info.publishTime, // 出版时间
      totalPage: info.totalPage, // 页数
      filePath: BASE_URL + info.filePath, // 文件路径
      resourceType: info.resourceType // 资源类型
    };
  },

  bankList: state => {
    const length = state.questionBankList.length;
    let index = 0; // start
    let resIndex = 0; // 输出数组的下标

    let result = new Array(Math.ceil(length / 2)); // 创建输出数组
    while (index < length) {
      result[resIndex++] = state.questionBankList.slice(index, (index += 2));
    }
    return result;
  },

  newsData: state => {
    return state.newsList.map(item => {
      return {
        id: item.id,
        title: item.title
      };
    });
  },

  newsInfo: state => {
    const info = state.newsInfo;
    return {
      id: info.id,
      title: info.title, // 新闻资讯标题
      descs: info.descs, // 新闻资讯详细内容
      name: info.name,
      resourceType: info.resourceType // 资源类型
    };
  },

  musicPictures: state => {
    return state.musicPicturesList.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath,
        title: item.title,
        author: item.author,
        creationTime: item.creationTime,
        filePath: BASE_URL + item.filePath, // 文件路径
        resourceType: item.resourceType // 资源类型
      };
    });
  },

  expertsData: state => {
    return state.experts.map(item => {
      return {
        id: item.id,
        mainImgPath: BASE_URL + item.mainImgPath,
        name: item.name,
        descs: item.descs
      };
    });
  },

  searchResult: state => state.searchResultList
};

const actions = {
  // 获取轮播图数据
  getBannerData({ state, commit }, params) {
    const list = [...state.bannerList];
    commit("setBannerList", { bannerList: [] });
    home.getHomePageList(
      params,
      items => commit("setBannerList", { bannerList: items }),
      () => commit("setBannerList", { bannerList: list })
    );
  },

  // 获取视频课程数据
  getVideoCourseList({ state, commit }, params) {
    const list = [...state.videoCourseList];
    commit("setVideoCourseList", { videoCourseList: [] });
    home.getHomePageList(
      params,
      items => commit("setVideoCourseList", { videoCourseList: items }),
      error => {
        commit("setVideoCourseList", { videoCourseList: list });
        throw new Error(error);
      }
    );
  },

  // 获取视频课程详情数据
  getVideoInfoDetail({ state, commit }, params) {
    const info = { ...state.videoCourseInfo };
    commit("setVideoDetail", { videoCourseInfo: {} });
    home.getHomePageListItemDetail(
      params,
      obj => commit("setVideoDetail", { videoCourseInfo: obj }),
      () => commit("setVideoDetail", { videoCourseInfo: info })
    );
  },

  // 获取电子图书数据
  getElectronicBooksList({ state, commit }, params) {
    const list = [...state.electronicBooksList];
    commit("setElectronicBooksList", { electronicBooksList: [] });
    home.getHomePageList(
      params,
      items => commit("setElectronicBooksList", { electronicBooksList: items }),
      () => commit("setElectronicBooksList", { electronicBooksList: list })
    );
  },

  // 获取电子图书详细信息
  getBookInfoDetail({ state, commit }, params) {
    const info = { ...state.bookInfo };
    commit("setBookDetail", { bookInfo: {} });
    home.getHomePageListItemDetail(
      params,
      obj => commit("setBookDetail", { bookInfo: obj }),
      () => commit("setBookDetail", { bookInfo: info })
    );
  },

  // 获取数字文献数据
  getDigitalDocumentList({ state, commit }, params) {
    const list = [...state.digitalDocumentList];
    commit("setDigitalDocumentList", { digitalDocumentList: [] });
    home.getHomePageList(
      params,
      items => commit("setDigitalDocumentList", { digitalDocumentList: items }),
      () => commit("setDigitalDocumentList", { digitalDocumentList: list })
    );
  },

  // 获取数字文献详细信息
  getDocumentInfoDetail({ state, commit }, params) {
    const info = { ...state.documentInfo };
    commit("setDocumentDetail", { documentInfo: {} });
    home.getHomePageListItemDetail(
      params,
      obj => commit("setDocumentDetail", { documentInfo: obj }),
      () => commit("setDocumentDetail", { documentInfo: info })
    );
  },

  // 获取测试题库数据
  getTestQuestionBankList({ state, commit }, params) {
    const list = [...state.questionBankList];
    commit("setTestQuestionBankList", { bankList: [] });
    exam.getPaperInfo(
      params,
      items => commit("setTestQuestionBankList", { bankList: items }),
      () => commit("setTestQuestionBankList", { bankList: list })
    );
  },

  // 获取新闻资讯数据
  getNewsList({ state, commit }, params) {
    const list = [...state.newsList];
    commit("setNewsList", { newsList: [] });
    home.getHomePageList(
      params,
      items => commit("setNewsList", { newsList: items }),
      () => commit("setNewsList", { newsList: list })
    );
  },

  // 获取新闻资讯详细信息
  getNewsInfoDetail({ state, commit }, params) {
    const info = { ...state.newsInfo };
    commit("setNewsDetail", { newsInfo: {} });
    home.getHomePageListItemDetail(
      params,
      obj => commit("setNewsDetail", { newsInfo: obj }),
      () => commit("setNewsDetail", { newsInfo: info })
    );
  },

  // 获取音乐图片数据
  getMusicPicturesList({ state, commit }, params) {
    const list = [...state.musicPicturesList];
    commit("setMusicPicturesList", { musicPicturesList: [] });
    home.getHomePageList(
      params,
      items => commit("setMusicPicturesList", { musicPicturesList: items }),
      () => commit("setMusicPicturesList", { musicPicturesList: list })
    );
  },

  // 获取专家信息数据
  getExpertsList({ state, commit }, params) {
    const list = [...state.experts];
    commit("setExpertsList", { experts: [] });
    home.getHomePageList(
      params,
      items => commit("setExpertsList", { experts: items }),
      () => commit("setExpertsList", { experts: list })
    );
  },

  // 查询获取高级搜索数据集
  getAdvancedSearch({ state, commit }, params) {
    const list = [...state.searchResultList];
    commit("setSearchResultList", { searchResult: [] });
    home.getHomePageList(
      params,
      items => commit("setSearchResultList", { searchResult: items }),
      () => commit("setSearchResultList", { searchResult: list })
    );
  }
};

const mutations = {
  setBannerList(state, { bannerList }) {
    state.bannerList = bannerList;
  },

  setVideoCourseList(state, { videoCourseList }) {
    state.videoCourseList = videoCourseList;
  },

  setVideoDetail(state, { videoCourseInfo }) {
    state.videoCourseInfo = videoCourseInfo;
  },

  setElectronicBooksList(state, { electronicBooksList }) {
    state.electronicBooksList = electronicBooksList;
  },

  setBookDetail(state, { bookInfo }) {
    state.bookInfo = bookInfo;
  },

  setDigitalDocumentList(state, { digitalDocumentList }) {
    state.digitalDocumentList = digitalDocumentList;
  },

  setDocumentDetail(state, { documentInfo }) {
    state.documentInfo = documentInfo;
  },

  setTestQuestionBankList(state, { bankList }) {
    state.questionBankList = bankList;
  },

  setNewsList(state, { newsList }) {
    state.newsList = newsList;
  },

  setNewsDetail(state, { newsInfo }) {
    state.newsInfo = newsInfo;
  },

  setMusicPicturesList(state, { musicPicturesList }) {
    state.musicPicturesList = musicPicturesList;
  },

  setExpertsList(state, { experts }) {
    state.experts = experts;
  },

  setSearchResultList(state, { searchResult }) {
    state.searchResultList = searchResult;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
