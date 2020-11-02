<template>
  <div class="L-detail">
    <div class="container">
      <div class="l-part">
        <el-row class="title">
          <span>{{ documentInfo.title }}</span>
        </el-row>
        <el-row class="sub-title">
          <span
            >{{ documentInfo.price | filterPrice }}
            {{ documentInfo.readCount }}人最近报名</span
          >
        </el-row>
        <el-row class="btn-group">
          <el-button type="primary" plain @click="readOnLine">
            在线阅读
          </el-button>
          <el-button
            type="primary"
            plain
            class="el-icon-download"
            @click="downLoad"
            >下载</el-button
          >
          <!-- <el-button type="primary" plain>导出</el-button> -->
          <el-button
            type="primary"
            plain
            class="el-icon-star-off"
            @click="collectDocument"
          >
            收藏
          </el-button>
          <el-button type="primary" plain class="el-icon-share">分享</el-button>
        </el-row>
        <div style="margin-bottom: 36px;">
          <limit-text :text="documentInfo.descs"></limit-text>
        </div>
        <div>
          <div class="L-msg">
            <el-row class="item">
              <el-col :span="4" class="l-msg-item">作者:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ documentInfo.author }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="4" class="l-msg-item">作者机构:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ documentInfo.authorOrganization }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="4" class="l-msg-item">刊名:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ documentInfo.name }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="4" class="l-msg-item">年，卷:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ documentInfo.publishDate }}
                <span v-show="documentInfo.volume">，</span>
                {{ documentInfo.volume }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="4" class="l-msg-item">所属邗期栏目:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ documentInfo.publishShop }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="4" class="l-msg-item">在线出版日期:</el-col>
              <el-col :span="18" class="l-msg-detail">
                {{ documentInfo.publishTime | convertTime("YYYY-MM-DD") }}
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="4" class="l-msg-item">页数:</el-col>
              <el-col :span="18" class="l-msg-detail">
                共{{ documentInfo.totalPage }}页
              </el-col>
            </el-row>
            <!-- <el-row class="item">
              <el-col :span="4" class="l-msg-item">页码:</el-col>
              <el-col :span="18" class="l-msg-detail">46-49.53</el-col>
            </el-row> -->
          </div>
        </div>
      </div>
      <div class="r-part">
        <Tabs :tabList="tabList" />
        <el-scrollbar :noresize="false" :viewStyle="{ maxHeight: '560px' }">
          <div class="list-wrap">
            <div v-for="(item, index) in relatedLiteratureList" :key="index">
              <div class="item">
                <span class="text">
                  <a
                    class="link-text detailA"
                    :title="item.title"
                    @click="toDocumentDetailPage(item)"
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
import LimitText from "@/components/LimitText";
import Footer from "@/components/layout/Footer";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  name: "LiteratureDetail",
  components: {
    Tabs,
    LimitText,
    Footer
  },
  data() {
    return {
      tabList: ["相关文献", "引文网络", "媒体资源"],
      isCollapse: true,
      relatedLiteratureList: []
    };
  },
  computed: {
    ...mapGetters("home", ["documentInfo", "digitalDocument"]),
    // 数字文献id
    documentId() {
      return this.$route.params.documentId;
    },

    token() {
      return getToken();
    }
  },
  watch: {
    digitalDocument: {
      handler(val) {
        this.relatedLiteratureList = val.filter(
          el => el.id !== this.documentId
        );
      }
    },

    // 监听路由改变 重新请求数据
    $route: "getDocumentInfo"
  },
  mounted() {
    this.getDocumentInfo();
  },
  methods: {
    // 获取数字文献详细信息
    getDocumentInfo() {
      this.$store.dispatch("home/getDocumentInfoDetail", {
        id: this.documentId
      });
      this.getRelatedLiterature();
    },

    // 获取相关文献
    getRelatedLiterature() {
      // 获取数字文献数据源
      this.$store.dispatch("home/getDigitalDocumentList", {
        FileResourceType: 6,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 11
      });
    },

    toDocumentDetailPage(item) {
      this.$router.push({
        path: `/literatureDetail/${item.id}`
      });
    },

    // 在线阅读
    readOnLine() {
      window.open(this.documentInfo.filePath, "_blank");
    },

    // 下载
    downLoad() {
      window.open(this.documentInfo.filePath, "_blank");
    },

    // 收藏
    collectDocument() {
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
        resourcesId: this.documentInfo.id,
        resourceName: this.documentInfo.name,
        collectDirecrotyId: "",
        resourcesType: this.documentInfo.resourceType
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

$fontFamily: PingFang SC, "微软雅黑";
$fontWeight: 500;
.L-detail {
  width: 100%;
  background: #f1f2f4;
  .container {
    display: flex;
    margin: 0 auto;
    text-align: left;
    margin-bottom: 38px;
    max-width: 1200px;
    min-width: 990px;
    .l-part {
      width: 860px;
      background: #fff;
      padding: 38px 28px;
      .title {
        color: #343434;
        @include text-font(24px, $fontFamily, $fontWeight);
        margin-bottom: 12px;
      }
      .sub-title {
        color: #9a9a9a;
        @include text-font(14px, $fontFamily, 400);
      }
      .btn-group {
        padding: 18px 0 27px;
      }
      .L-msg {
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
