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
    <div class="M-wrapper">
      <div class="container">
        <div v-for="(item, index) in musicList" :key="index" class="item">
          <div class="music-area">
            <el-image
              :src="item.mainImgPath"
              class="img-item"
              fit="cover"
              style="cursor: pointer;"
              @click="toMusicPhotoDetail(item)"
            ></el-image>
            <div class="music-name">
              <a :title="item.title" @click="toMusicPhotoDetail(item)">
                {{ item.title }}
              </a>
            </div>
            <div class="music-info">
              <span>{{ item.author }}</span>
            </div>
            <div class="music-info">
              <span>{{ item.creationTime | convertTime("YYYY/MM/DD") }}</span>
            </div>
          </div>
        </div>
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

    <!-- 音乐图片弹窗 -->
    <music-photo-detail
      v-if="musicPhotoDetailVisible"
      :musicPhotoDetailVisible="musicPhotoDetailVisible"
      :fileType="fileType"
      :musicInfo="musicInfo"
      @closeMusicPhotoDialog="musicPhotoDetailVisible = false"
    ></music-photo-detail>

    <Footer />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader";
import Pagination from "@/components/Pagination";
import Footer from "@/components/layout/Footer";
import MusicPhotoDetail from "./MusicPhotoDetail";
import { mapGetters } from "vuex";
export default {
  name: "Music",
  components: {
    MainHeader,
    Pagination,
    Footer,
    MusicPhotoDetail
  },
  data() {
    return {
      breadCrumbData: [
        {
          path: "/home",
          name: "首页"
        },
        {
          name: "音乐"
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
      size: 24,
      layout: "prev, pager, next",
      fileType: "",
      musicInfo: {},
      musicPhotoDetailVisible: false
    };
  },
  computed: {
    ...mapGetters("musicPhoto", ["musicList", "totalCount", "categoryData"]),
    filterResult() {
      return `筛选结果 ${this.total} 首音乐`;
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
        .dispatch("musicPhoto/getResourceCategory", {
          input: 3
        })
        .then(() => {
          if (this.categoryData.length) {
            this.form.categoryId = this.categoryData[0].id;
          }
        });
    },

    getTableData() {
      let params = {
        fileResourceType: 3,
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
      this.$store.dispatch("musicPhoto/getMusicPhotoList", params);
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

    // 点击打开音乐图片弹窗
    toMusicPhotoDetail(item) {
      if (this.common.isAssetTypeAnImage(item.filePath)) {
        this.fileType = "image";
      } else {
        this.fileType = "audio";
      }
      this.musicInfo = item;
      this.musicPhotoDetailVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.M-wrapper {
  background: #fff;
  width: 100%;
  padding: 40px 0;
  // margin-bottom: 300px;
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    border: 1px solid #fff;
    .item {
      margin: 0 24px 25px 0;
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
