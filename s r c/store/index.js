import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import home from "./modules/home";
import videoCourse from "./modules/video-course";
import digitalLiterature from "./modules/digital-literature";
import electronicBook from "./modules/electronic-book";
import testQuestion from "./modules/test-question";
import news from "./modules/news";
import musicPhoto from "./modules/music-photo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    home,
    videoCourse,
    digitalLiterature,
    electronicBook,
    testQuestion,
    news,
    musicPhoto
  }
});
