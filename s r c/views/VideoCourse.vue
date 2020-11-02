<template>
  <div>
    <main-header
      :breadCrumbData="breadCrumbData"
      :sortData="categoryData"
      :filterResult="filterResult"
      @onFilterChange="onFilterChange"
      @setSortFiled="setSortFiled"
      @setPriceInterval="setPriceInterval"
    ></main-header>
    <div class="V-C-wrapper">
      <div class="container">
        <el-row
          v-for="(item, index) in videoCourseList"
          :key="index"
          class="item"
        >
          <div class="video-area">
            <el-image
              class="img-item"
              :src="item.mainImgPath"
              fit="cover"
              @click="toVideoDetailPage(item)"
            ></el-image>
            <div>
              <el-row class="V-title">
                <div>
                  <a :title="item.title" @click="toVideoDetailPage(item)">
                    {{ item.title }}
                  </a>
                </div>
              </el-row>
              <el-row class="V-desc" style="margin-bottom: 22px;">
                <div>{{ item.descs }}</div>
              </el-row>
              <el-row class="V-desc">
                <span>共{{ item.volume }}节 ｜ {{ item.author }}</span>
                <!-- <el-button type="primary" size="mini" round>认证</el-button> -->
              </el-row>
              <el-row class="V-desc">
                <span>
                  {{ item.price | filterPrice }}&nbsp;
                  {{ item.readCount }}人最近报名
                </span>
              </el-row>
            </div>
          </div>
          <el-divider></el-divider>
        </el-row>
        <div style="clear: both;"></div>
        <div class="pg">
          <pagination
            v-if="total > 0"
            :total="total"
            :page.sync="currentPageNum"
            :limit.sync="size"
            :layout="layout"
            @pagination="getTableData"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader";
import Pagination from "@/components/Pagination";
import Footer from "@/components/layout/Footer";
import { mapGetters } from "vuex";
export default {
  name: "VideoCource",
  components: {
    MainHeader,
    Pagination,
    Footer
  },
  data() {
    return {
      breadCrumbData: [
        {
          path: "/home",
          name: "首页"
        },
        {
          name: "视频课程"
        }
      ],
      form: {
        categoryId: "",
        year: "全部",
        price: "",
        sortField: "all",
        isDesc: false,
        minPrice: "",
        maxPrice: ""
      },
      total: 0,
      currentPageNum: 0,
      size: 20,
      layout: "prev, pager, next"
    };
  },
  computed: {
    ...mapGetters("videoCourse", [
      "videoCourseList",
      "totalCount",
      "categoryData"
    ]),
    filterResult() {
      return `筛选结果 ${this.total} 门课程`;
    }
  },
  watch: {
    totalCount: {
      immediate: true,
      handler(val) {
        this.total = val;
      }
    },

    form: {
      immediate: true,
      deep: true,
      handler() {
        this.getTableData();
      }
    }
  },
  mounted() {
    this.initFilterData();
  },
  methods: {
    // 初始化筛选条件
    initFilterData() {
      // 分类
      this.$store
        .dispatch("videoCourse/getResourceCategory", {
          input: 1
        })
        .then(() => {
          if (this.categoryData.length) {
            this.form.categoryId = this.categoryData[0].id;
          }
        });
    },

    getTableData() {
      let params = {
        fileResourceType: 1,
        skipCount: this.currentPageNum * this.size,
        maxResultCount: this.size
      };
      // 分类
      if (this.form.categoryId !== "") {
        Object.assign(params, { categoryId: this.form.categoryId });
      }
      // 时间
      if (this.form.year !== "全部") {
        Object.assign(params, { year: this.form.year });
      }
      // 价格
      if (this.form.price !== "") {
        Object.assign(params, { price: this.form.price });
      }
      // 价格区间最小值
      if (this.form.minPrice !== "") {
        Object.assign(params, { minPrice: this.form.minPrice });
      }
      // 价格区间最大值
      if (this.form.maxPrice !== "") {
        Object.assign(params, { maxPrice: this.form.maxPrice });
      }
      // 排序
      if (this.form.sortField !== "all") {
        // all: 综合排序
        Object.assign(params, {
          sortField: this.form.sortField,
          isDesc: this.form.isDesc
        });
      }
      this.$store.dispatch("videoCourse/getVideoCourseList", params);
    },

    /**
     * 按照分类、时间、类型筛选视频课程数据
     * @param {string} form - 筛选的值
     * @param {number} filterProp - 所有筛选的字段名
     */
    onFilterChange(form, filterProp) {
      filterProp.forEach(prop => {
        this.form[prop] = form[prop];
      });
    },

    // 价格区间筛选条件
    setPriceInterval({ minPrice, maxPrice }) {
      this.form.minPrice = minPrice;
      this.form.maxPrice = maxPrice;
    },

    // 点击标题跳转视频课程详情页
    toVideoDetailPage(item) {
      this.$router.push({
        path: `/videoDetail/${item.id}`
      });
    },

    // 排序条件改变
    setSortFiled({ sortField, isDesc }) {
      this.form.sortField = sortField;
      this.form.isDesc = isDesc;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
$fontFamily: PingFang SC, "微软雅黑";
$fontWeight: 500;
.V-C-wrapper {
  background: #fff;
  width: 100%;
  min-width: 990px;
  padding: 40px 0;
  .container {
    max-width: 1200px;
    margin: 0 auto;
    .item {
      text-align: left;
      .V-title {
        padding-bottom: 15px;
        @include text-font(20px, $fontFamily, 600);
        a {
          cursor: pointer;
          &:hover {
            color: #64c0bc;
          }
        }
      }
      .V-desc {
        color: #9a9a9a;
        @include text-font(16px, $fontFamily, 400);
      }
    }
    .pg {
      width: 100%;
      .pagination-container {
        padding: 0;
      }
    }
  }
}
</style>
