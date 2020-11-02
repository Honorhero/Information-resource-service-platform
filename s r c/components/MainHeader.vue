<template>
  <div class="main-header-wrapper">
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item, index) in breadCrumbData"
            :key="index"
          >
            <a v-if="item.path" :href="item.path">{{ item.name }}</a>
            <span v-else>{{ item.name }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sort-filter">
        <div class="l-text">
          <span>分类：</span>
        </div>
        <div class="r-filter">
          <ul>
            <li
              v-for="(item, index) in sortData"
              :key="index"
              class="item"
              :class="{ 'is-active': curClassificationIndex === index }"
            >
              <a
                href="javascript:void(0);"
                @click="handleClassificationChange(item.id, index)"
                >{{ item.name }}</a
              >
            </li>
          </ul>
        </div>
        <div style="clear: both;"></div>
      </div>
      <el-divider></el-divider>
      <div class="time-filter">
        <div class="l-text">
          <span>时间：</span>
        </div>
        <div class="r-filter">
          <ul>
            <li
              v-for="(item, index) in timeFilterData"
              :key="index"
              class="item"
              :class="{ 'is-active': curYearIndex === index }"
              @click="handleYearChange(item, index)"
            >
              <a href="javascript:void(0);">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div style="clear: both;"></div>
      </div>
      <el-divider></el-divider>
      <div class="type-filter">
        <div class="l-text">
          <span>类型：</span>
        </div>
        <div class="r-filter">
          <ul>
            <li
              v-for="(item, index) in typeFilterData"
              :key="index"
              class="item"
              :class="{ 'is-active': curTypeIndex === index }"
            >
              <a
                href="javascript:void(0);"
                @click="handleTypeChange(item, index)"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
    <div class="filter-operate-area">
      <div class="container">
        <div class="filter-operate">
          <a
            class="fSort"
            href="javascript:void(0);"
            :class="{ 'is-active': curSortActive && curSortIndex === 0 }"
            @click="sortChange(0, 'all')"
            >综合排序</a
          >
          <!-- <a
            class="fSort"
            href="javascript:void(0);"
            :class="{ 'is-active': curSortActive && curSortIndex === 1 }"
            @click="curSortIndex = 1"
            >好评率<i class="el-icon-caret-bottom"></i
          ></a> -->
          <a
            class="fSort"
            href="javascript:void(0);"
            :class="{ 'is-active': curSortActive && curSortIndex === 2 }"
            @click="sortChange(2, 'readCount', true)"
            >人气<i class="el-icon-caret-bottom"></i
          ></a>
          <a
            class="fSort-price"
            href="javascript:void(0);"
            :class="{ 'is-active': curSortActive && curSortIndex === 3 }"
            @click="handleSortByPrice"
            >价格
            <span class="caret-wrapper">
              <i
                class="sort-caret ascending"
                :class="{ 'is-active': !sortByDesc && curSortIndex === 3 }"
              ></i>
              <i
                class="sort-caret descending"
                :class="{ 'is-active': sortByDesc && curSortIndex === 3 }"
              ></i>
            </span>
          </a>
          <span class="fSort">
            <el-popover
              v-model="showPriceBox"
              placement="bottom-start"
              trigger="hover"
              width="200"
              popper-class="price-select-box"
            >
              <ul>
                <li
                  v-for="(item, index) in priceIntervalData"
                  :key="index"
                  class="price-item"
                  :class="{
                    'is-selected':
                      form.minPrice === item.minPrice && form.minPrice !== -1
                  }"
                >
                  <a @click="setPriceInterval(item)">{{ item.label }}</a>
                </li>
                <div class="price-input-box">
                  <form>
                    <el-input
                      v-model="minPrice"
                      maxlength="10"
                      placeholder="¥"
                      style="width: 60px;"
                      oninput="value = value.replace(/[^\d^\.]/g, '')"
                    ></el-input>
                    <span class="text">-</span>
                    <el-input
                      v-model="maxPrice"
                      maxlength="10"
                      placeholder="¥"
                      style="width: 60px;"
                      oninput="value = value.replace(/[^\d^\.]/g, '')"
                    ></el-input>
                    <el-button
                      type="primary"
                      @click="onSubmitPrice"
                      style="margin-left: 8px;"
                    >
                      确定
                    </el-button>
                  </form>
                  <div v-show="showTip" class="errorMsg">
                    * 价格区间下限应该小于上限
                  </div>
                </div>
              </ul>
              <a
                slot="reference"
                href="javascript:void(0);"
                class="sortA"
                @mouseenter="showPriceInterval = true"
                @mouseleave="showPriceInterval = false"
              >
                <span>{{ priceIntervalLabel }}</span>
                <i
                  :class="
                    !showPriceInterval
                      ? 'el-icon-caret-bottom'
                      : 'el-icon-caret-top'
                  "
                ></i>
              </a>
            </el-popover>
          </span>
        </div>
        <div class="filter-result">
          <span>{{ filterResult }}</span>
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
</template>

<script>
const date = new Date();
export default {
  name: "MainHeader",
  props: {
    // 面包屑导航数据源
    breadCrumbData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 分类筛选条件数据源
    sortData: Array,
    // 筛选结果
    filterResult: String
  },
  data() {
    return {
      timeFilterData: [],
      typeFilterData: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "免费"
        },
        {
          value: 0.1,
          label: "付费"
        }
      ],
      curSortIndex: 0,
      curClassificationIndex: 0,
      curYearIndex: 0,
      curTypeIndex: 0,
      curSortActive: true,
      sortByDesc: false,
      count: 0,
      form: {
        categoryId: "",
        year: "全部",
        price: "",
        minPrice: "",
        maxPrice: ""
      },
      filterProp: ["categoryId", "year", "price"],
      showPriceInterval: false,
      showPriceBox: false,
      priceIntervalLabel: "价格区间",
      priceIntervalData: [
        {
          label: "不限",
          minPrice: "",
          maxPrice: ""
        },
        {
          label: "¥ 1-99",
          minPrice: 1,
          maxPrice: 99
        },
        {
          label: "¥ 100-499",
          minPrice: 100,
          maxPrice: 499
        },
        {
          label: "¥ 500-999",
          minPrice: 500,
          maxPrice: 999
        },
        {
          label: "¥ 1000及以上",
          minPrice: 1000,
          maxPrice: ""
        }
      ],
      minPrice: "",
      maxPrice: "",
      showTip: false
    };
  },
  mounted() {
    // 设置时间数据 从当前年份往前推10年
    this.handleTimeData();
  },
  methods: {
    handleTimeData() {
      let year = date.getFullYear();
      this.timeFilterData = this.common.setTimeFilterData(year);
    },

    // 分类筛选条件改变
    handleClassificationChange(categoryId, index) {
      this.curClassificationIndex = index;
      // this.$emit("onClassificationChange", categoryId);
      this.form.categoryId = categoryId;
      this.$emit("onFilterChange", this.form, this.filterProp);
    },

    // 时间（年）筛选条件改变
    handleYearChange(year, index) {
      this.curYearIndex = index;
      // this.$emit("onYearChange", year);
      this.form.year = year;
      this.$emit("onFilterChange", this.form, this.filterProp);
    },

    // 类型筛选条件改变
    handleTypeChange(item, index) {
      this.curTypeIndex = index;
      // this.$emit("onTypeChange", item.value);
      this.form.price = item.value;
      this.$emit("onFilterChange", this.form, this.filterProp);
    },

    // 价格筛选条件
    handleSortByPrice() {
      this.curSortIndex = 3;
      // 注：第一次点击默认降序排列
      this.sortByDesc = !this.sortByDesc;

      // 按照price排序
      this.$emit("setSortFiled", {
        sortField: "price",
        isDesc: this.sortByDesc
      });
    },

    sortChange(index, sortField, isDesc) {
      this.curSortIndex = index;
      this.sortByDesc = false; // 点击其他排序条件，将价格排序置为降序
      this.$emit("setSortFiled", { sortField, isDesc });
    },

    // 点击获取价格区间
    setPriceInterval(item) {
      if (item.minPrice) {
        this.priceIntervalLabel = `${item.minPrice} - ${item.maxPrice}`;
      } else {
        this.priceIntervalLabel = "价格区间";
      }
      this.form.minPrice = item.minPrice;
      this.form.maxPrice = item.maxPrice;
      this.$emit("setPriceInterval", {
        minPrice: item.minPrice,
        maxPrice: item.maxPrice
      });
      this.showPriceBox = false;
    },

    // 手动设置价格区间
    onSubmitPrice() {
      this.showTip = false;
      if (this.minPrice === "" && this.maxPrice === "") {
        return;
      }
      this.minPrice = this.convertPrice(this.minPrice);
      this.maxPrice = this.convertPrice(this.maxPrice);
      // 价格下限大于上限给出提示
      if (Number(this.minPrice) > Number(this.maxPrice)) {
        this.showTip = true;
        return;
      }
      this.$emit("setPriceInterval", {
        minPrice: Number(this.minPrice),
        maxPrice: Number(this.maxPrice)
      });
      this.priceIntervalLabel = `${this.minPrice} - ${this.maxPrice}`;
      this.form.minPrice = -1;
      // 重置价格区间输入框数据
      this.minPrice = this.maxPrice = "";
      // 隐藏价格区间下拉选择框
      this.showPriceBox = false;
    },

    convertPrice(price) {
      if (price === "") {
        return price;
      }
      price = price.replace(/\.{2,}/g, ".");
      price = price
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");

      // 保留两位小数
      price = price.replace(/^(\\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");

      // 控制的是如果没有小数点，首位不能为类似于 01、02
      if (!price.includes(".")) {
        price = parseFloat(price);
      }
      return Number.parseFloat(price).toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.sortA {
  color: #333;
  outline: none;
}
.price-select-box {
  .price-item {
    width: 150px;
    height: 38px;
    line-height: 38px;
    a {
      font-size: 16px;
      font-weight: 400;
      font-family: PingFang SC, "微软雅黑";
      color: #333;
      cursor: pointer;
      &:hover {
        color: #5fafa4;
      }
    }
  }
  .price-item.is-selected {
    a {
      color: #5fafa4;
    }
  }
  .price-input-box {
    border-top: 1px solid #ddd;
    padding: 10px 0 0;
    /deep/.el-input__inner {
      padding: 5px;
    }
    .text {
      padding: 0 5px;
    }
    .errorMsg {
      margin-top: 5px;
      color: red;
    }
  }
}
</style>
