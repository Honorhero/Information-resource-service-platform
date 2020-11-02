<template>
  <div class="N-detail">
    <div class="container">
      <div class="l-part">
        <div style="margin-bottom: 10px;">
          <el-button type="primary" plain @click="collectNews">
            收藏
          </el-button>
        </div>
        <div class="news-wrap">
          <div class="title">
            <span>{{ newsInfo.title }}</span>
          </div>
          <div class="content">
            <div v-html="newsInfo.descs"></div>
          </div>
        </div>
      </div>
      <div class="r-part">
        <el-scrollbar :noresize="false" :viewStyle="{ maxHeight: '560px' }">
          <Tabs :tabList="tabList" style="justify-content: flex-start;" />
          <div class="list-wrap">
            <div v-for="(item, index) in relatedNewsList" :key="index">
              <div class="item">
                <span class="text">
                  <a
                    class="link-text detailA"
                    :title="item.title"
                    @click="toNewsDetailPage(item)"
                  >
                    <i class="el-icon-document"></i>
                    {{ item.title }}
                  </a>
                </span>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
import Footer from "@/components/layout/Footer";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  name: "NewsDetail",
  components: {
    Tabs,
    Footer
  },
  data() {
    return {
      tabList: ["推荐新闻"],
      isCollapse: true,
      relatedNewsList: []
    };
  },
  computed: {
    ...mapGetters("home", ["newsInfo", "newsData"]),
    // 电子图书id
    newsId() {
      return this.$route.params.newsId;
    },

    token() {
      return getToken();
    }
  },
  watch: {
    newsData: {
      handler(val) {
        this.relatedNewsList = val.filter(el => el.id !== this.newsId);
      }
    },

    // 监听路由改变 重新请求数据
    $route: "getNewsInfo"
  },
  mounted() {
    this.getNewsInfo();
  },
  methods: {
    // 获取电子图书详细信息
    getNewsInfo() {
      this.$store.dispatch("home/getNewsInfoDetail", {
        id: this.newsId
      });
      this.getRelatedNews();
    },

    // 获取推荐新闻
    getRelatedNews() {
      // 获取新闻资讯数据源
      this.$store.dispatch("home/getNewsList", {
        FileResourceType: 10,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 11
      });
    },

    toNewsDetailPage(item) {
      this.$router.push({
        path: `/newsDetail/${item.id}`
      });
    },

    // 收藏
    collectNews() {
      if (!this.token) {
        this.$router.push({
          path: "/login"
        });
        this.$notify({
          title: "信息",
          type: "info",
          message: "收藏资源需要先登录"
        });
        return;
      }
      this.$store.dispatch("user/collectResource", {
        resourcesId: this.newsInfo.id,
        resourceName: this.newsInfo.name,
        collectDirecrotyId: "",
        resourcesType: this.newsInfo.resourceType
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

$fontFamily: PingFang SC, "微软雅黑";
$fontWeight: 500;
.N-detail {
  width: 100%;
  background: #f1f2f4;
  .container {
    display: flex;
    margin: 0 auto 38px;
    text-align: left;
    max-width: 1200px;
    min-width: 990px;
    .l-part {
      width: 860px;
      background: #fff;
      padding: 38px 28px;
      .news-wrap {
        color: #333;
        @include text-font(24px, $fontFamily, $fontWeight);
        .title {
          margin-bottom: 35px;
        }
        .content {
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
    .r-part {
      width: 320px;
      max-height: 560px;
      background: #fff;
      padding: 20px 26px;
      margin-left: 20px;
    }
    .detailA {
      cursor: pointer;
      &:hover {
        color: #64c0bc;
      }
    }
  }
}
</style>
