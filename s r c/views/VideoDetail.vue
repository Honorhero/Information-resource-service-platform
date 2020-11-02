<template>
  <div class="V-detail-wrapper">
    <div class="video-area">
      <div class="player-area">
        <ali-player
          ref="AliPlayer"
          :autoplay="false"
          :preload="true"
        ></ali-player>
      </div>
      <div class="course-nav-list">
        <div class="tab-area">
          <Tabs :tabList="tabList1" @getTabIndex="getleftTabIndex" />
        </div>
        <div style="padding: 0 10px;">
          <el-scrollbar :noresize="false" :viewStyle="{ maxHeight: '438px' }">
            <div v-show="curTabIndex1 === 0" class="l-course-list">
              <ul>
                <li
                  v-for="(item, index) in videoCourse"
                  :key="index"
                  class="item"
                  :class="curCourseIndex === index ? 'is-play' : ''"
                  @click="onChangeCourse(index)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div
              v-show="curTabIndex1 === 1"
              v-html="videoCourseInfo.descs"
              class="text"
            ></div>
            <div
              v-show="curTabIndex1 === 2"
              v-html="videoCourseInfo.author"
              class="text"
            ></div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="content">
      <el-row :gutter="22">
        <el-col :span="16">
          <div class="l-part">
            <div class="detail-area">
              <div class="tab-area">
                <Tabs :tabList="tabList" @getTabIndex="getTabIndex" />
              </div>
              <div class="container">
                <div
                  v-show="curTabIndex === 0"
                  v-html="videoCourseInfo.descs"
                  class="desc-content"
                ></div>
                <el-row v-show="curTabIndex === 0" style="margin-top: 10px;">
                  <el-button type="primary" plain @click="collectVideoCourse">
                    收藏
                  </el-button>
                </el-row>
                <div v-show="curTabIndex === 1" class="course-list">
                  <ul>
                    <li
                      v-for="(item, index) in videoCourse"
                      :key="index"
                      class="course-item"
                      :class="curCourseIndex === index ? 'is-play' : ''"
                      @click="onChangeCourse(index)"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="recommand-area">
              <div class="title">
                <div style="float: left;">推荐课程</div>
                <!-- <div class="title-change">
                  换一换
                  <i class="el-icon-refresh"></i>
                </div> -->
                <div style="clear: both;"></div>
              </div>
              <div class="content">
                <div
                  v-for="(item, index) in recommandList"
                  :key="index"
                  class="item"
                >
                  <el-image
                    class="img"
                    :src="item.mainImgPath"
                    fit="cover"
                    @click="toVideoDetailPage(item)"
                  ></el-image>
                  <div class="video-title">
                    <a
                      class="link-text"
                      :title="item.title"
                      @click="toVideoDetailPage(item)"
                      >{{ item.title }}</a
                    >
                  </div>
                  <el-row class="info-top">
                    共{{ item.volume }}节 ｜ {{ item.author }}
                  </el-row>
                  <el-row class="info-bottom">
                    {{ item.price | filterPrice }}&nbsp;
                    {{ item.readCount }}人最近报名
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="r-part">
            <div class="container">
              <div class="r-part-title">相关课程</div>
              <div class="r-part-content">
                <div
                  v-for="(item, index) in relatedCourse"
                  :key="index"
                  class="item"
                >
                  <el-image
                    v-show="index === 0"
                    class="img"
                    :src="item.mainImgPath"
                    fit="cover"
                    @click="toVideoDetailPage(item)"
                  ></el-image>
                  <div class="video-title">
                    <a
                      class="link-text"
                      :title="item.title"
                      @click="toVideoDetailPage(item)"
                      >{{ item.title }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import AliPlayer from "@/components/Aliplayer";
import Tabs from "@/components/Tabs";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  name: "VideoDetail",
  components: {
    AliPlayer,
    Tabs
  },
  data() {
    return {
      tabList: ["课程概述", "目录", "评论"],
      tabList1: ["选集", "简介", "作者"],
      curTabIndex: 0,
      curTabIndex1: 0,
      curCourseIndex: 0, // 当前视频课程选集, 默认第一个
      relatedCourse: []
    };
  },
  computed: {
    ...mapGetters("home", ["videoCourseInfo", "videoCourse"]),

    ...mapGetters("videoCourse", ["recommandList", "videoCourseList"]),

    // 视频课程id
    videoCourseId() {
      return this.$route.params.videoCourseId;
    },

    token() {
      return getToken();
    }
  },
  watch: {
    videoCourse: {
      handler(val) {
        if (val.length) {
          this.$refs.AliPlayer.loadByUrl(val[0].filePath, 0);
        }
      }
    },

    videoCourseList(val) {
      this.relatedCourse = val.filter(el => el.id !== this.videoCourseId);
    },

    $route() {
      this.getVideoCourseInfo();
    }
  },
  mounted() {
    this.getVideoCourseInfo();
  },
  methods: {
    // 获取视频课程详细信息
    getVideoCourseInfo() {
      this.$store.dispatch("home/getVideoInfoDetail", {
        id: this.videoCourseId
      });
      this.getVideoCourseList();
      this.getCourseRecommandList();
      this.getRelatedVideoCourse();
    },

    // 获取视频课程所有视频
    getVideoCourseList() {
      this.$store.dispatch("home/getVideoCourseList", {
        fileResourceType: 5,
        parentId: this.videoCourseId,
        skipCount: 0,
        maxResultCount: 1000
      });
    },

    // 获取当前视频的推荐课程
    getCourseRecommandList() {
      this.$store.dispatch("videoCourse/getRecommandCourse", {
        id: this.videoCourseId,
        count: 8
      });
    },

    // 获取相关课程
    getRelatedVideoCourse() {
      this.$store.dispatch("videoCourse/getVideoCourseList", {
        FileResourceType: 1,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 8
      });
    },

    // 获取视频下部区域点击的tabIndex
    getTabIndex(index) {
      this.curTabIndex = index;
    },

    // 获取视频右侧区域点击的tabIndex
    getleftTabIndex(index) {
      this.curTabIndex1 = index;
    },

    // 点击切换视频
    onChangeCourse(index) {
      this.curCourseIndex = index;
      // 切换选中的选集视频
      this.$refs.AliPlayer.loadByUrl(this.videoCourse[index].filePath, 0);
    },

    // 跳转视频详情页
    toVideoDetailPage(item) {
      this.$router.push({
        path: `/videoDetail/${item.id}`
      });
    },

    // 收藏当前视频课程
    collectVideoCourse() {
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
        resourcesId: this.videoCourseInfo.id,
        resourceName: this.videoCourseInfo.name,
        collectDirecrotyId: "",
        resourcesType: this.videoCourseInfo.resourceType
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/home.scss";
$fontFamily: PingFang SC, "微软雅黑";

.V-detail-wrapper {
  width: 100%;
  background: #f1f2f4;
  .video-area {
    background: #000;
    width: 100%;
    height: 500px;
    .player-area {
      width: calc(100% - 250px);
    }
    .course-nav-list {
      width: 250px;
      .tab-area {
        padding: 20px 0;
        width: 200px;
      }
      .l-course-list {
        .item {
          color: #fff;
          background: #000;
          padding-left: 10px;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          font-family: PingFang SC, "微软雅黑";
          cursor: pointer;
          &:hover {
            color: #5afafa;
            background: #0a0f0e;
          }
        }
        .item.is-play {
          color: #5afafa;
          background: #0a0f0e;
        }
      }
      .text {
        color: #fff;
        font-size: 14px;
        font-family: PingFang SC, "微软雅黑";
      }
    }
  }
  .content {
    padding: 30px 0;
    margin: 0 auto;
    max-width: 1200px;
  }
  .l-part {
    text-align: left;
    .detail-area {
      background: #fff;
      .tab-area {
        width: 260px;
        padding: 29px 0 40px;
      }
      .container {
        padding: 0 22px 20px;
        .desc-content {
          font-size: 16px;
          font-family: PingFang S, "微软雅黑";
          font-weight: 400;
          color: #333;
        }
        .course-list {
          .course-item {
            color: #333;
            background: #f4f4f4;
            margin-bottom: 20px;
            padding-left: 10px;
            line-height: 50px;
            font-size: 14px;
            font-family: PingFang SC, "微软雅黑";
            cursor: pointer;
            &:hover {
              background: #eee;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
          .course-item.is-play {
            background: #eee;
          }
        }
      }
    }
    .recommand-area {
      background: #fff;
      margin-top: 25px;
      .title {
        padding: 20px 22px;
        color: #5fafa4;
        @include text-font(16px, $fontFamily, 500);
        .title-change {
          float: right;
          cursor: pointer;
        }
      }
      .content {
        display: flex;
        padding: 0 22px 20px;
        .img {
          width: 25%;
        }
        .item {
          width: 25%;
          padding: 0 10px;
          .img {
            width: 100%;
            height: 131px;
            cursor: pointer;
          }
          .video-title {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical; /* 从顶部向底部垂直布置子元素 */
            white-space: pre-wrap;
            -webkit-line-clamp: 2; /* -webkit */
            margin-bottom: 10px;
            max-height: 40px;
            @include text-font(16px, $fontFamily, $fontWeight);
            color: #333;
          }
          .info-top {
            color: #999;
            @include text-font(16px, $fontFamily, 400);
          }
          .info-bottom {
            color: #999;
            @include text-font(14px, $fontFamily, 400);
          }
        }
      }
    }
  }
  .r-part {
    text-align: left;
    .container {
      background: #fff;
      .r-part-title {
        padding: 29px 22px 20px;
        color: #5fafa4;
        @include text-font(16px, $fontFamily, 500);
      }
      .r-part-content {
        padding: 0 22px 20px;
        .item {
          padding: 10px 0;
          border-bottom: 1px solid #dcdfe6;
          &:last-child {
            padding: 10px 0 0;
            border: 0;
          }
          .img {
            width: 100%;
            height: 180px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
