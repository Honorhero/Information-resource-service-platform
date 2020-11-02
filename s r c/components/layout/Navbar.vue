<template>
  <div id="site-nav">
    <div class="site-logo">
      <img src="@/assets/image/logo.png" alt />
    </div>
    <div class="sn-menu">
      <div class="sn-container">
        <el-menu
          :default-active="defaultActive"
          mode="horizontal"
          router
          background-color="#5fafa4"
          text-color="#fff"
          active-text-color="#fff"
          class="el-menu-demo"
          @select="handleNavItemSelect"
        >
          <el-menu-item
            v-for="(item, index) in navlist"
            :key="index"
            :index="item.index"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </div>
      <div class="sn-search">
        <div class="search-input">
          <el-input
            v-model="keyWord"
            placeholder="请输入关键词"
            @keydown.native="onInputKeyDown"
            style="color: #fff;"
          >
            <i slot="prefix" class="el-icon-search"></i>
          </el-input>
        </div>
        <div class="search-link">
          <a style="cursor: pointer;" @click="onAdvancedSearch">高级搜索</a>
        </div>
      </div>
      <div class="sn-login-info">
        <span v-show="!token">
          <a class="sn-login" href="javascript:void(0)" @click="login">登录</a>
          <em>/</em>
          <a class="sn-register" href="javascript:void(0)" @click="register">
            注册
          </a>
        </span>
        <span v-show="token">
          <el-popover
            v-model="showUserList"
            placement="bottom-start"
            trigger="hover"
          >
            <ul class="app-header-profile-menu">
              <li class="menu-item">
                <a class="link" @click="toUserHomePage">
                  <i class="el-icon-user"></i>
                  <span>我的主页</span>
                </a>
                <!-- <el-link
                  type="primary"
                  :underline="false"
                  @click="toUserHomePage"
                >
                  <i class="el-icon-user"></i>我的主页
                </el-link> -->
              </li>
              <!-- <li class="menu-item">
                <el-link type="primary" :underline="false">
                  <i class="el-icon-setting"></i>设置
                </el-link>
              </li> -->
              <!-- <li class="menu-item">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleBrowseRecord"
                >
                  浏览记录
                </el-link>
              </li>
              <li class="menu-item">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleCollectionRecord"
                >
                  收藏记录
                </el-link>
              </li> -->
              <li class="menu-item">
                <a class="link" @click="logout">
                  <i class="el-icon-switch-button"></i>
                  <span>退出登录</span>
                </a>
                <!-- <el-link type="primary" :underline="false" @click="logout">
                  <i class="el-icon-switch-button"></i>退出登录
                </el-link> -->
              </li>
            </ul>
            <a slot="reference" href="javascript:void(0)" class="sn-user">
              {{ userInfo.userName }}
            </a>
          </el-popover>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/layout/navbar.scss";
import { mapGetters } from "vuex";
import { getToken, removeToken } from "@/utils/auth";
export default {
  name: "Navbar",
  data() {
    return {
      navlist: [
        { index: "/home", name: "首页" },
        { index: "/videoCourse", name: "视频课程" },
        { index: "/digitalLiterature", name: "数字文献" },
        { index: "/digitalBook", name: "电子图书" },
        { index: "/news", name: "新闻资讯" },
        { index: "/musicPhoto", name: "音乐图片" }
      ],
      defaultActive: "/home",
      showLogin: true,
      token: "",
      showUserList: false,
      keyWord: ""
    };
  },
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  watch: {
    $route(to) {
      this.token = getToken();
      if (to.path) {
        this.keyWord = "";
        let obj = this.navlist.find(el => el.index === to.path);
        if (typeof obj !== "undefined") {
          this.defaultActive = obj.index;
        }
      }
    }
  },
  mounted() {
    this.token = getToken();
    if (this.token) {
      this.$store.dispatch("user/getUserInfo");
    } else {
      sessionStorage.removeItem("userInfo"); // 清除登录用户的信息
    }
  },
  methods: {
    handleNavItemSelect(index, indexPath) {
      console.log(index, indexPath);
    },

    // 关键词输入框键盘按下enter键跳转到高级搜索页面
    onInputKeyDown(e) {
      if (e.keyCode === 13) {
        this.onAdvancedSearch();
      }
    },

    // 高级搜索
    onAdvancedSearch() {
      this.$router.push({
        path: this.keyWord ? `/search/${this.keyWord}` : "/search/高级搜索"
      });
    },

    login() {
      if (this.$route.name === "/login") {
        return;
      }
      this.$router.push({
        path: "/login"
      });
    },

    register() {
      if (this.$route.path === "/register") {
        return;
      }
      this.$router.push({
        path: "/register"
      });
    },

    // 跳转个人主页
    toUserHomePage() {
      this.showUserList = false;
      if (this.$route.path === "/user") {
        return;
      }
      this.$router.push({
        path: "/user"
      });
    },

    logout() {
      removeToken();
      this.token = "";
      this.showUserList = false;
      if (this.$route.path === "/login") {
        return;
      }
      this.$router.push({
        path: "/login"
      });
      sessionStorage.removeItem("userInfo"); // 清除登录用户的信息
    },

    handleBrowseRecord() {
      this.showUserList = false;
      this.$router.push({
        path: "/userBrowseRecord"
      });
    },

    handleCollectionRecord() {
      this.showUserList = false;
      this.$router.push({
        path: "/userCollectionRecord"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-header-profile-menu {
  .menu-item {
    display: flex;
    height: 36px;
    .link {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0 5px;
      cursor: pointer;
      &:hover {
        background-color: #ededed;
      }
      i {
        margin-right: 8px;
      }
    }
    // i {
    //   margin-right: 8px;
    // }
  }
}
</style>
