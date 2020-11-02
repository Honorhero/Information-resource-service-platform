<template>
  <div class="tab-list">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-item"
      :class="{ 'is-active': isActive && activeIndex === index }"
      @click="tabClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    tabList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      isActive: true,
      activeIndex: 0
    };
  },
  methods: {
    tabClick(index) {
      this.isActive = true;
      this.activeIndex = index;
      this.$emit("getTabIndex", this.activeIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-list {
  display: flex;
  justify-content: space-around;
  .tab-item {
    position: relative;
    cursor: pointer;
    color: #999;
    font-size: 16px;
    font-weight: 400;
    font-family: PingFang SC, "微软雅黑";
  }
  .tab-item.is-active {
    color: #5fafa4;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 100%;
      height: 4px;
      background-color: #60b0a4;
    }
  }
}
</style>
