<!-- 电子文献 -->
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
    <div class="D-L-wrapper">
      <div class="container">
        <div class="query-area">
          <el-input
            v-model="form1.title"
            placeholder="标题"
            style="width: 192px;"
          ></el-input>
          <el-input
            v-model="form1.author"
            placeholder="作者"
            style="width: 192px;"
          ></el-input>
          <el-input
            v-model="form1.keyWord"
            placeholder="关键词"
            style="width: 192px;"
          ></el-input>
          <el-input
            v-model="form1.name"
            placeholder="刊名"
            style="width: 192px;"
          ></el-input>
          <el-input
            v-model="form1.minYear"
            placeholder="起始年"
            style="width: 108px;"
          ></el-input>
          <div class="line"></div>
          <el-input
            v-model="form1.maxYear"
            placeholder="结束年"
            style="width: 108px;"
          ></el-input>
          <el-button type="primary" @click="getTableData">搜索</el-button>
        </div>
        <div class="sort-area">
          <secondary-sort
            :totalCount="totalCount"
            :currentPageNum="currentPageNum"
            @onSizeChange="onSizeChange"
            @onCurrentPageChange="onCurrentPageChange"
            @onSecondarySortChange="setSortFiled"
          ></secondary-sort>
        </div>
        <div>
          <multi-list
            :listData="documentList"
            :currentPageNum="currentPageNum"
            :size="size"
            :sourceFrom="'document'"
          ></multi-list>
        </div>
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
import SecondarySort from "@/components/SecondarySort";
import MultiList from "@/components/MultiList";
import Pagination from "@/components/Pagination";
import Footer from "@/components/layout/Footer";
import { mapGetters } from "vuex";
export default {
  name: "DigitalLiterature",
  components: {
    MainHeader,
    SecondarySort,
    MultiList,
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
          name: "数字文献"
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
      form1: {
        title: "",
        author: "",
        keyWord: "",
        name: "",
        minYear: "",
        maxYear: ""
      },
      total: 0,
      currentPageNum: 0,
      size: 20,
      layout: "prev, pager, next"
    };
  },
  computed: {
    ...mapGetters("digitalLiterature", [
      "documentList",
      "totalCount",
      "categoryData"
    ]),
    filterResult() {
      return `筛选结果 ${this.total} 文献`;
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
        .dispatch("digitalLiterature/getResourceCategory", {
          input: 6
        })
        .then(() => {
          if (this.categoryData.length) {
            this.form.categoryId = this.categoryData[0].id;
          }
        });
    },

    getTableData() {
      let params = {
        fileResourceType: 6,
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
      // 标题
      if (this.form1.title !== "") {
        Object.assign(params, { title: this.form1.title });
      }
      // 作者
      if (this.form1.author !== "") {
        Object.assign(params, { author: this.form1.author });
      }
      // 关键词
      if (this.form1.keyWord !== "") {
        Object.assign(params, { keyWord: this.form1.keyWord });
      }
      // 刊名
      if (this.form1.name !== "") {
        Object.assign(params, { name: this.form1.name });
      }
      // 起始年
      if (this.form1.minYear !== "") {
        Object.assign(params, { minYear: this.form1.minYear });
      }
      // 结束年
      if (this.form1.maxYear !== "") {
        Object.assign(params, { maxYear: this.form1.maxYear });
      }
      this.$store.dispatch("digitalLiterature/getDocumentList", params);
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

    // 排序条件改变
    setSortFiled({ sortField, isDesc }) {
      this.form.sortField = sortField;
      this.form.isDesc = isDesc;
    },

    // 每页显示条数改变
    onSizeChange(size) {
      this.size = size;
      this.getTableData();
    },

    // 上面页码改变切换分页组件页码
    onCurrentPageChange(currentPage) {
      this.currentPageNum = currentPage - 1;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
.D-L-wrapper {
  background: #fff;
  width: 100%;
  min-width: 990px;
  padding: 40px 0;
  .container {
    max-width: 1200px;
    margin: 0 auto;
    .query-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .line {
        width: 12px;
        height: 1px;
        line-height: 32px;
        border-bottom: 1px solid #999;
      }
    }
    .sort-area {
      padding: 24px 0 18px;
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
