<template>
  <div class="advanced-search-main">
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>高级搜索</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-input
          placeholder="请输入关键词"
          v-model="keyWord"
          class="input-with-button"
          @keydown.native="onInputKeyUp"
        >
          <el-button
            slot="append"
            type="primary"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
      </el-row>
      <div class="search-result">
        <div class="title">
          <span>搜索结果(共{{ total }}条)</span>
        </div>
        <div class="content">
          <div class="list" v-for="(item, index) in searchResult" :key="index">
            <a
              class="result-item"
              :title="item.title"
              @click="jumpToOtherPage(item)"
            >
              {{ index + currentPageNum * size + 1 }}. {{ item.title }}
              {{ item.title }}
            </a>
          </div>
          <div class="pg">
            <pagination
              v-if="total > 0"
              :total="total"
              :page.sync="currentPageNum"
              :limit.sync="size"
              @pagination="search"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
export default {
  name: "AdvancedSearch",
  components: {
    Pagination
  },
  data() {
    return {
      keyWord: "",
      total: 0,
      currentPageNum: 0,
      size: 20
    };
  },
  computed: {
    key() {
      const keyword = this.$route.params.keyword;
      return keyword === "高级搜索" ? "" : keyword;
    },

    ...mapGetters("home", ["searchResult"])
  },
  watch: {
    key: {
      immediate: true,
      handler(val) {
        this.keyWord = val;
        this.search();
      }
    },

    searchResult: {
      handler(val) {
        this.total = val.length;
      }
    }
  },
  methods: {
    onInputKeyUp(e) {
      if (e.keyCode === 13) {
        this.search();
      }
    },

    search() {
      this.$store.dispatch("home/getAdvancedSearch", {
        keyword: this.keyWord
      });
    },

    jumpToOtherPage(item) {
      const resourceType = item.resourceType;
      switch (resourceType) {
        // 视频课程
        case 1:
          this.$router.push({
            path: `/videoDetail/${item.id}`
          });
          break;
        // 电子图书
        case 4:
          this.$router.push({
            path: `/bookDetail/${item.id}`
          });
          break;
        // 数字文献
        case 6:
          this.$router.push({
            path: `/literatureDetail/${item.id}`
          });
          break;
        // 新闻资讯
        case 10:
          this.$router.push({
            path: `/newsDetail/${item.id}`
          });
          break;
        // 音乐图片
        case 3:
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
$fontFamily: PingFang SC, "微软雅黑";
$fontWeight: 500;

.advanced-search-main {
  width: 100%;
  .container {
    margin: 20px auto;
    max-width: 1200px;
    min-width: 960px;
    text-align: left;
    .crumbs {
      width: 100%;
      padding: 39px 0 52px;
      a,
      span {
        font-size: 16px;
      }
    }
    .search-result {
      margin-top: 20px;
      .title {
        color: #5fafa4;
        @include text-font(20px, $fontFamily, $fontWeight);
      }
      .list {
        display: flex;
        flex: 1;
        align-items: center;
        width: 100%;
        height: 38px;
        .result-item {
          color: #606266;
          @include text-font(16px, $fontFamily, $fontWeight);
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .pg {
        text-align: center;
      }
    }
  }
}
</style>
