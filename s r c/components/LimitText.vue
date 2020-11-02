<template>
  <div class="limit-text">
    <span class="text">{{ innerText }}</span>
    <a v-show="isShow" @click="showDetail">
      <span>{{ isCollapse ? "显示全部" : "收起" }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "LimitText",
  props: {
    text: String,
    // 最多显示的文字的字数
    maxSize: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      isShow: false,
      isCollapse: true,
      innerText: "",
      contentLength: 0
    };
  },
  watch: {
    text: {
      handler(val) {
        this.handleLimitText(val);
      }
    }
  },
  mounted() {
    // this.innerText = this.text;
    // this.$nextTick(() => {
    //   this.contentLength = this.$el.querySelector("span").innerHTML.length;
    //   if (this.contentLength <= this.maxSize) {
    //     this.isShow = false;
    //   } else {
    //     this.isShow = true;
    //     this.innerText = this.innerText.substring(0, this.maxSize) + "...";
    //   }
    // });
  },
  methods: {
    handleLimitText(val) {
      this.innerText = val;

      this.$nextTick(() => {
        this.contentLength = this.$el.querySelector("span").innerHTML.length;
        if (this.contentLength <= this.maxSize) {
          this.isShow = false;
        } else {
          this.isShow = true;
          this.innerText = this.innerText.substring(0, this.maxSize) + "...";
        }
      });
    },

    showDetail() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.innerText = this.innerText.substring(0, this.maxSize) + "...";
      } else {
        this.innerText = this.text;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.limit-text {
  position: relative;
  color: #333;
  max-height: none;
  font-size: 16px;
  font-family: PingFang SC, "微软雅黑";
  font-weight: 400;
  .text {
    white-space: normal;
    word-break: break-word;
    line-height: 1.6;
  }
  a {
    display: inline-block;
    white-space: nowrap;
    color: #5fafa4;
    cursor: pointer;
  }
}
</style>
