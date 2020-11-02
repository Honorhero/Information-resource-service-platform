<template>
  <div class="S-sort-wrapper">
    <el-row type="flex" justify="space-around" align="center">
      <el-col :span="14" class="l-part">
        <span>排序：</span>
        <a
          v-for="(item, index) in sortData"
          :key="index"
          class="fSort"
          :class="{ 'is-active': curSortIndex === index }"
          @click="handleSortChange(item, index)"
        >
          <span>
            <span>{{ item.label }}</span>
            <i
              v-show="curSortIndex === index"
              :class="isDesc ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            ></i>
          </span>
        </a>
      </el-col>
      <el-col :span="10" class="r-part">
        <div>
          <!-- <el-popover
            placement="bottom-start"
            trigger="hover"
            content="显示范围"
          >
            <span
              slot="reference"
              class="popover-item"
              @mouseover="showRangeDetail = true"
              @mouseleave="showRangeDetail = false"
            >
              <span>显示范围</span
              ><i v-show="!showRangeDetail" class="el-icon-arrow-down"></i
              ><i v-show="showRangeDetail" class="el-icon-arrow-up"></i>
            </span>
          </el-popover>
          <el-divider direction="vertical"></el-divider> -->
          <el-popover
            placement="bottom-start"
            trigger="hover"
            v-model="pageSizeListVisible"
          >
            <ul>
              <li
                v-for="(item, index) in pageSizeData"
                :key="index"
                class="dropdown-item"
                :class="pageSize === item.value ? 'selected' : ''"
                @click="handlePageSizeChange(item.value)"
              >
                {{ item.label }}
              </li>
            </ul>
            <span
              slot="reference"
              class="popover-item"
              @mouseover="showSizeDetail = true"
              @mouseleave="showSizeDetail = false"
            >
              <span>显示{{ pageSize }}条</span>
              <i v-show="!showSizeDetail" class="el-icon-arrow-down"></i>
              <i v-show="showSizeDetail" class="el-icon-arrow-up"></i>
            </span>
          </el-popover>
          <el-divider direction="vertical"></el-divider>
          <span class="page-item">
            <i
              class="el-icon-arrow-left"
              :style="!canToLast ? styleObj : ''"
              @click="toLastPage"
            ></i>
            <span>{{ currentPage }}/{{ totalPage }}</span>
            <i
              class="el-icon-arrow-right"
              :style="!canToNext ? styleObj : ''"
              @click="toNextPage"
            ></i>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SortSubHeader",
  props: {
    totalCount: Number,
    currentPageNum: Number
  },
  data() {
    return {
      curSortIndex: 0,
      // sortData: ["相关度", "出版时间", "被引次数", "下载量"],
      sortData: [
        {
          value: "publishDate",
          label: "出版时间"
        }
      ],
      showRangeDetail: false,
      showSizeDetail: false,
      pageSize: 20, // 每页显示条数
      currentPage: 1, // 当前页
      // 不能切页的样式
      styleObj: {
        cursor: "not-allowed",
        color: "#c0c4cc"
      },
      pageSizeData: [
        {
          value: 5,
          label: "5条/页"
        },
        {
          value: 10,
          label: "10条/页"
        },
        {
          value: 20,
          label: "20条/页"
        },
        {
          value: 30,
          label: "30条/页"
        },
        {
          value: 40,
          label: "40条/页"
        },
        {
          value: 50,
          label: "50条/页"
        }
      ],
      pageSizeListVisible: false,
      isDesc: true
    };
  },
  computed: {
    totalPage() {
      let count = Math.ceil(this.totalCount / this.pageSize);
      return count === 0 ? 1 : count;
    },

    // 是否可以跳转到前一页
    canToLast() {
      return this.currentPage === 1 ? false : true;
    },

    // 是否可以跳转到前一页
    canToNext() {
      return this.currentPage === this.totalPage ? false : true;
    }
  },
  watch: {
    pageSize: {
      handler(val) {
        this.$emit("onSizeChange", val);
      }
    },

    currentPageNum: {
      handler(val) {
        this.currentPage = val + 1;
      }
    }
  },
  methods: {
    // 排序条件改变
    handleSortChange(item, index) {
      this.curSortIndex = index;
      this.isDesc = !this.isDesc;
      this.$emit("onSecondarySortChange", {
        sortField: item.value,
        isDesc: this.isDesc
      });
    },

    // 每页显示条数改变
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.pageSizeListVisible = false;
    },

    // 跳转上一页
    toLastPage() {
      if (!this.canToLast) {
        return;
      }
      this.currentPage -= 1;
      this.$emit("onCurrentPageChange", this.currentPage);
    },

    // 跳转下一页
    toNextPage() {
      if (!this.canToNext) {
        return;
      }
      this.currentPage += 1;
      this.$emit("onCurrentPageChange", this.currentPage);
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown-item {
  font-size: 16px;
  height: 28px;
  line-height: 28px;
  cursor: pointer !important;
  &:hover {
    color: #5fafa4;
  }
}
.dropdown-item.selected {
  color: #5fafa4;
}
.S-sort-wrapper {
  padding: 18px 0 18px 26px;
  text-align: left;
  font-size: 16px;
  font-family: PingFang SC, "微软雅黑";
  font-weight: 500;
  background: #edf5f3;
  .l-part {
    color: #333;
    a {
      color: inherit;
      cursor: pointer;
      text-decoration: none;
    }
    .fSort {
      margin-right: 48px;
    }
    .fSort.is-active {
      color: #5fafa4;
    }
  }
  .r-part {
    text-align: right;
    color: #5fafa4;
    .popover-item {
      cursor: pointer;
      outline: none;
      padding: 0 10px;
    }
    .page-item {
      padding: 0 10px;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
