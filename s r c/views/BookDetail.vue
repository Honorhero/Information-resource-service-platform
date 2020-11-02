<template>
  <div class="B-detail">
    <div class="container">
      <div class="part-top">
        <el-row class="title">
          <span>{{ bookInfo.title }}</span>
        </el-row>
        <el-row type="flex">
          <el-image
            :src="bookInfo.mainImgPath"
            class="img-item"
            fit="cover"
          ></el-image>
          <div class="B-msg">
            <el-row class="item">
              <el-col :span="3" class="l-msg-item">作者:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ bookInfo.author }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="3" class="l-msg-item">出版社:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ bookInfo.authorOrganization }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="3" class="l-msg-item">出版时间:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ bookInfo.creationTime | convertTime("yyyy年M月DD日") }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="3" class="l-msg-item">页数:</el-col>
              <el-col :span="18" class="l-msg-detail">
                <span>共{{ bookInfo.totalPage }}页</span>
              </el-col>
            </el-row>
            <el-row>
              <el-button type="primary" plain @click="readOnLine">
                在线阅读
              </el-button>
              <el-button type="primary" plain @click="downLoad">下载</el-button>
              <el-button type="primary" plain @click="collectedBook">
                收藏
              </el-button>
            </el-row>
          </div>
        </el-row>
      </div>
      <div class="part-description">
        <el-row class="title">简介</el-row>
        <el-row class="content">
          <span>{{ bookInfo.descs }}</span>
        </el-row>
      </div>
      <div class="part-suggestion">
        <el-row class="title">相关推荐</el-row>
        <el-row type="flex" style="flex-wrap: wrap;">
          <div v-for="(item, index) in relatedBooksList" :key="index">
            <div class="book-img-area" style="margin: 0 36px 25px 0;">
              <el-image
                :src="item.mainImgPath"
                class="img-item"
                fit="cover"
                style="cursor: pointer;"
                @click="toBookDetailPage(item)"
              ></el-image>
              <div class="info-text">
                <a
                  class="link-text"
                  :title="item.title"
                  @click="toBookDetailPage(item)"
                  >{{ item.title }}</a
                >
              </div>
            </div>
          </div>
        </el-row>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/layout/Footer";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  name: "BookDetail",
  components: {
    Footer
  },
  data() {
    return {
      relatedBooksList: []
    };
  },
  computed: {
    ...mapGetters("home", ["bookInfo", "electronicBooks"]),

    // 电子图书id
    bookId() {
      return this.$route.params.bookId;
    },

    token() {
      return getToken();
    }
  },
  watch: {
    electronicBooks: {
      handler(val) {
        this.relatedBooksList = val.filter(el => el.id !== this.bookId);
      }
    },

    // 监听路由改变 重新请求数据
    $route: "getBookInfo"
  },
  mounted() {
    this.getBookInfo();
  },
  methods: {
    // 获取电子图书详细信息
    getBookInfo() {
      this.$store.dispatch("home/getBookInfoDetail", {
        id: this.bookId
      });
      this.getRelatedBooks();
    },

    // 获取相关推荐的电子图书
    getRelatedBooks() {
      // 获取电子图书数据源
      this.$store.dispatch("home/getElectronicBooksList", {
        FileResourceType: 4,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 13
      });
    },

    // 点击电子图书图片/标题跳转图书详情页
    toBookDetailPage(item) {
      this.$router.push({
        path: `/bookDetail/${item.id}`
      });
    },

    // 在线阅读
    readOnLine() {
      window.open(this.bookInfo.filePath, "_blank");
    },

    // 下载
    downLoad() {
      window.open(this.bookInfo.filePath, "_blank");
    },

    // 收藏
    collectedBook() {
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
        resourcesId: this.bookInfo.id,
        resourceName: this.bookInfo.name,
        collectDirecrotyId: "",
        resourcesType: this.bookInfo.resourceType
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

$fontFamily: PingFang SC, "微软雅黑";
$fontWeight: 500;
.B-detail {
  width: 100%;
  background: #f1f2f4;
  .container {
    max-width: 1200px;
    min-width: 990px;
    margin: 0 auto;
    text-align: left;
    margin-bottom: 38px;
    .part-top {
      background: #fff;
      padding: 38px 28px;
      .title {
        color: #343434;
        @include text-font(24px, $fontFamily, $fontWeight);
        margin-bottom: 32px;
      }
      .img-item {
        width: 211px;
        height: 256px;
        margin-right: 39px;
      }
      .B-msg {
        width: 800px;
        .item {
          margin-bottom: 18px;
          @include text-font(16px, $fontFamily, 400);
          .l-msg-item {
            color: #9a9a9a;
          }
          .l-msg-detail {
            color: #343434;
          }
        }
      }
    }
    .part-description,
    .part-suggestion {
      background: #fff;
      padding: 38px 28px;
      margin-top: 15px;
      @include text-font(16px, $fontFamily, 400);
      .title {
        color: #60b0a4;
        padding-bottom: 16px;
      }
      .content {
        color: #343434;
      }
    }
  }
}
</style>
