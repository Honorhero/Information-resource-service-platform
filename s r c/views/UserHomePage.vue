<template>
  <div class="user-main">
    <div class="user-container">
      <div class="content">
        <div class="nav">
          <nav>
            <ol>
              <li v-for="(item, index) in menuList" :key="index">
                <a
                  class="nav-link"
                  :class="activeIndex === index ? 'is-active' : ''"
                  @click="onMenuChange(index)"
                >
                  <span class="nav-link-text">{{ item }}</span>
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div class="r-part">
          <user-account
            v-show="activeIndex === 0"
            :userAccountInfo="userInfo"
          ></user-account>
          <user-password
            v-show="activeIndex === 1"
            :activeIndex="activeIndex"
          ></user-password>
          <user-browse-record v-show="activeIndex === 2"></user-browse-record>
          <user-collection-record
            v-show="activeIndex === 3"
          ></user-collection-record>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserAccount from "./UserAccount";
import UserPassword from "./UserPassword";
import UserBrowseRecord from "./UserBrowseRecord";
import UserCollectionRecord from "./UserCollectionRecord";
export default {
  name: "UserCenter",
  components: {
    UserAccount,
    UserPassword,
    UserBrowseRecord,
    UserCollectionRecord
  },
  data() {
    return {
      activeIndex: 0,
      menuList: ["个人中心", "修改密码", "浏览记录", "收藏记录"]
    };
  },
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  mounted() {
    this.$store.dispatch("user/getUserInfo");
  },
  methods: {
    onMenuChange(index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
$fontFamily: PingFang SC, "微软雅黑";
$fontWeight: 500;

.user-main {
  background-color: #f1f2f4;
  padding: 20px 0;
  .user-container {
    min-width: 960px;
    max-width: 1200px;
    margin: 0 auto;
    .content {
      display: flex;
      flex: 1;
      // flex-direction: column;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
      min-height: calc(100vh - 126px);
      .nav {
        width: 160px;
        text-align: left;
        .nav-link {
          display: flex;
          align-items: center;
          padding-left: 28px;
          height: 50px;
          cursor: pointer;
          .nav-link-text {
            color: #343434;
            @include text-font(16px, $fontFamily, $fontWeight);
          }
        }
        .nav-link.is-active {
          background-color: #ddd;
        }
      }
      .r-part {
        width: 100%;
        border-left: 1px solid #ebebeb;
      }
    }
  }
}
</style>
