import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { getToken } from "../utils/auth";

// 解决路由重复点击报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => error);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/videoCourse",
    name: "VideoCourse",
    component: () => import("../views/VideoCourse.vue")
  },
  {
    path: "/digitalLiterature",
    name: "DigitalLiterature",
    component: () => import("../views/DigitalLiterature.vue")
  },
  {
    path: "/digitalBook",
    name: "DigitalBook",
    component: () => import("../views/DigitalBook.vue")
  },
  {
    path: "/news",
    name: "News",
    component: () => import("../views/News.vue")
  },
  {
    path: "/musicPhoto",
    name: "MusicPhoto",
    component: () => import("../views/MusicPhoto.vue")
  },
  {
    path: "/videoDetail/:videoCourseId",
    name: "VideoDetail",
    component: () => import("../views/VideoDetail.vue")
  },
  {
    path: "/bookDetail/:bookId",
    name: "BookDetail",
    component: () => import("../views/BookDetail.vue")
  },
  {
    path: "/literatureDetail/:documentId",
    name: "LiteratureDetail",
    component: () => import("../views/LiteratureDetail.vue")
  },
  {
    path: "/newsDetail/:newsId",
    name: "NewsDetail",
    component: () => import("../views/NewsDetail.vue")
  },
  {
    path: `/search/:keyword`,
    name: "Search",
    component: () => import("../views/AdvancedSearch.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/user",
    name: "User",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/UserHomePage.vue")
  },
  {
    path: "/paperDetail/:paperId",
    name: "PaperDetail",
    component: () => import("../views/TestQuestionBank.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta && route.meta.requiresAuth)) {
    if (!getToken()) {
      // 没有登录信息跳转到登录页
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.path === "/login" || to.path === "/register") {
    if (getToken()) {
      // 登录成功 不可以跳转到登录、注册页面
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
