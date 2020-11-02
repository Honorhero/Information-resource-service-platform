<template>
  <div class="multi-list">
    <!-- <el-row type="flex" align="bottom" class="header">
      <el-col :span="12" class="l-part">
        <span>
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            批量选择
          </el-checkbox>
          <span class="total-text">(已选择{{ total }}条)</span>
        </span>
        <a class="link">清除</a>
        <a class="link">导出</a>
      </el-col>
      <el-col :span="12" class="r-part">
        <span class="filter-result">筛选结果</span>
      </el-col>
    </el-row> -->
    <el-divider></el-divider>
    <div class="content">
      <div v-for="(item, index) in list" :key="index" class="list-item">
        <el-row>
          <!-- <el-checkbox
            v-model="item.checked"
            @change="handlCheckedChange($event, item)"
          > -->
          <a class="title" :href="linkHref + '/' + item.id">
            <span class="all-label">
              {{ index + currentPageNum * size + 1 }}. {{ item.title }}
            </span>
          </a>
          <!-- </el-checkbox> -->
        </el-row>
        <el-row type="flex" class="info-text">
          <div
            v-for="(itemB, index) in item.simpleInfo"
            :key="index"
            class="item"
          >
            <!-- 发布时间特殊处理 -->
            <span v-if="item.title === '发布时间'">
              {{ itemB.title }}: {{ itemB.info | convertTime("YYYY/MM/DD") }}
            </span>
            <span v-else>{{ itemB.title }}: {{ itemB.info }}</span>
          </div>
        </el-row>
        <el-row type="flex" class="info-text">
          <div style="min-width: 48px;">简介：</div>
          <div v-html="item.descs"></div>
        </el-row>
        <el-row type="flex" class="footer">
          <el-col :span="12">
            <el-button type="primary" plain @click="readOnLine(item)"
              >在线阅读</el-button
            >
            <el-button type="primary" plain @click="downLoad(item)">
              下载
            </el-button>
            <!-- <el-button type="primary" plain>导出</el-button> -->
          </el-col>
          <!-- <el-col :span="12" class="total-info">
            <span>被引：0&nbsp;&nbsp;&nbsp;</span>
            <span>下载：25</span>
          </el-col> -->
        </el-row>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiList",
  props: {
    listData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    currentPageNum: Number,
    size: Number,
    // 当前页面来源(news: 新闻资讯, document: 数字文献)
    sourceFrom: {
      type: String,
      required: true,
      validator: value => {
        return ["news", "document"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      total: 0,
      list: [],
      checkAll: false, // 是否全选
      isIndeterminate: false, // 用于样式控制
      checkedIds: []
    };
  },
  computed: {
    // 点击详情跳转链接
    linkHref() {
      return this.sourceFrom === "news" ? "/newsDetail" : "/literatureDetail";
    }
  },
  watch: {
    listData: {
      immediate: true,
      handler(val) {
        this.list = val.map(item => {
          item.checked = false;
          return item;
        });
      }
    }
  },
  methods: {
    readOnLine(item) {
      window.open(item.filePath, "_blank");
    },

    downLoad(item) {
      window.open(item.filePath, "_blank");
    },

    // 批量选择
    handleCheckAllChange(val) {
      this.checkedIds = [];
      this.list.forEach(item => {
        item.checked = val;
        if (val) {
          this.checkedIds.push(item.id);
        }
      });
      if (!val) {
        this.checkedIds = [];
      }
      this.total = val ? this.list.length : 0;
      this.isIndeterminate = false;
    },

    // 单个选择
    handlCheckedChange(val, item) {
      if (val) {
        this.checkedIds.push(item.id);
      } else {
        let index = this.checkedIds.findIndex(el => el === item.id);
        if (index !== -1) {
          this.checkedIds.splice(index, 1);
        }
      }
      let checkedCount = this.checkedIds.length;
      this.total = checkedCount;
      this.checkAll = checkedCount === this.list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.list.length;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

$fontFamily: PingFang SC, "微软雅黑";
$fontWeight: 400;
.multi-list {
  padding-left: 26px;
  .header {
    height: 31px;
    .l-part {
      color: #333;
      text-align: left;
      @include text-font(14px, $fontFamily, $fontWeight);
      .total-text {
        color: #999;
        margin-right: 46px;
      }
      .link {
        padding: 0 5px;
        cursor: pointer;
        text-decoration: none;
        &:hover {
          color: #5fafa4;
        }
      }
    }
    .r-part {
      text-align: right;
      .filter-result {
        color: #5fafa4;
        @include text-font(18px, $fontFamily, 600);
      }
    }
  }
  .content {
    text-align: left;
    .title {
      color: #333 !important;
      text-decoration: none;
      @include text-font(18px, $fontFamily, 800);
      .all-label {
        display: inline-grid;
        white-space: pre-line;
        &:hover {
          color: #5fafa4;
        }
      }
    }
    .info-text {
      color: #666;
      margin-top: 19px;
      @include text-font(16px, $fontFamily, $fontWeight);
      .item {
        margin-right: 40px;
        &:last-child {
          margin: 0;
        }
      }
    }
    .footer {
      margin-top: 22px;
      .total-info {
        color: #5fafa4;
        @include text-font(16px, $fontFamily, $fontWeight);
        text-align: right;
      }
    }
  }
}
</style>
