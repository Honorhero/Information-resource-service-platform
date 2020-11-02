<template>
  <div class="home">
    <div class="category-image">
      <el-carousel height="300px">
        <el-carousel-item v-for="(item, index) in bannerData" :key="index">
          <div
            :style="{
              'background-color': item.backgroundColor,
              'text-align': 'center'
            }"
          >
            <el-image
              :src="item.mainImgPath"
              fit="cover"
              class="img"
            ></el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <div class="course-container">
        <div class="main">
          <div class="title">
            <div class="main-title">
              <a href="/videoCourse">视频课程</a>
            </div>
            <div class="sub-title">
              <a href="/videoCourse">video course</a>
            </div>
          </div>
          <div class="video-area">
            <div v-for="(item, index) in videoCourse" :key="index" class="item">
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
      <div class="book-container">
        <div class="main">
          <div class="l-book">
            <div class="title">
              <div class="main-title">
                <a href="/digitalBook">电子图书</a>
              </div>
              <div class="sub-title">
                <a href="/digitalBook">Electronic books</a>
              </div>
            </div>
            <div class="l-book-image">
              <div v-for="(item, index) in electronicBooks" :key="index">
                <el-image
                  :src="item.mainImgPath"
                  class="image-item"
                  fit="cover"
                  @click="toBookDetailPage(item)"
                ></el-image>
                <div class="image-text">
                  <a
                    class="link-text"
                    :title="item.title"
                    @click="toBookDetailPage(item)"
                    >{{ item.title }}</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="r-book">
            <div class="title">
              <div class="main-title">
                <a href="/digitalLiterature">数字文献</a>
              </div>
              <div class="sub-title">
                <a href="/digitalLiterature">Digital document</a>
              </div>
            </div>
            <div class="book-list">
              <div v-for="(item, index) in digitalDocument" :key="index">
                <el-row v-if="index === 0" type="flex" class="r-book-top1">
                  <div>
                    <el-image
                      :src="item.mainImgPath"
                      class="top1-image"
                      fit="cover"
                      @click="toDocumentDetailPage(item)"
                    ></el-image>
                  </div>
                  <div>
                    <div class="news-text">
                      <a
                        class="link-text"
                        :title="item.title"
                        @click="toDocumentDetailPage(item)"
                      >
                        {{ item.title }}
                      </a>
                    </div>
                    <div class="top1-book-info">
                      <span>
                        {{ item.price | filterPrice }}
                        {{ item.readCount }}人最近报名
                      </span>
                    </div>
                    <div>
                      <el-button
                        type="primary"
                        size="mini"
                        round
                        @click="toDocumentDetailPage(item)"
                        >立即阅读</el-button
                      >
                    </div>
                  </div>
                </el-row>
                <div v-else>
                  <div class="ellipse-text">
                    <a
                      class="link-text"
                      :title="item.title"
                      @click="toDocumentDetailPage(item)"
                    >
                      <i class="el-icon-notebook-2"></i>
                      {{ item.title }}
                    </a>
                  </div>
                  <el-divider></el-divider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
      </div>

      <div class="slogan-container"></div>

      <div class="container-news">
        <div class="main-news">
          <div class="l-news">
            <div class="title">
              <div class="main-title">测试题库</div>
              <div class="sub-title">Test question bank</div>
            </div>
            <div class="news-list">
              <el-row v-for="(item, index) in bankList" :key="index">
                <div class="ellipse-text">
                  <el-col v-if="item[0]" :span="12">
                    <a
                      class="link-text"
                      :title="item[0].paperName"
                      :href="'/paperDetail/' + item[0].id"
                    >
                      <i class="el-icon-notebook-2"></i>
                      {{ item[0].paperName }}
                    </a>
                  </el-col>
                  <el-col v-if="item[1]" :span="12">
                    <a
                      class="link-text"
                      :title="item[1].paperName"
                      :href="'/paperDetail/' + item[1].id"
                    >
                      <i class="el-icon-notebook-2"></i>
                      {{ item[1].paperName }}
                    </a>
                  </el-col>
                </div>
                <el-divider></el-divider>
              </el-row>
            </div>
          </div>

          <div class="r-news">
            <div class="title">
              <div class="main-title">
                <a href="/news">新闻资讯</a>
              </div>
              <div class="sub-title">
                <a href="/news">News and information</a>
              </div>
            </div>
            <div class="news-list">
              <el-row v-for="(item, index) in newsData" :key="index">
                <div class="ellipse-text">
                  <a
                    class="link-text"
                    :title="item.title"
                    @click="toNewsDetailPage(item)"
                  >
                    <i class="el-icon-notebook-2"></i>
                    {{ item.title }}
                  </a>
                </div>
                <el-divider></el-divider>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <div class="container-music">
        <div class="main-music">
          <div class="title">
            <div class="main-title">
              <a href="/musicPhoto">音乐图片</a>
            </div>
            <div class="sub-title">
              <a href="/musicPhoto">Music Pictures</a>
            </div>
          </div>
          <div class="image-area">
            <div v-for="(item, index) in musicPictures" :key="index">
              <el-image
                :src="item.mainImgPath"
                class="image-item"
                fit="cover"
              ></el-image>
              <div class="music-title">
                <a
                  class="link-text"
                  :title="item.title"
                  @click="toMusicPhotoDetail(item)"
                  >{{ item.title }}</a
                >
              </div>
              <div class="music-info">
                <span>{{ item.author }}</span>
              </div>
              <div class="music-info">
                <span>{{ item.creationTime | convertTime("YYYY/MM/DD") }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-expert">
        <div class="main-expert">
          <div class="title">
            <div class="main-title">机构专家</div>
            <div class="sub-title">Music Pictures</div>
          </div>
          <div class="card">
            <div v-for="(item, index) in expertsData" :key="index">
              <el-card
                class="box-card"
                :body-style="{ display: 'flex', padding: '31px 23px 27px' }"
              >
                <el-avatar
                  shape="circle"
                  :size="86"
                  fit="cover"
                  :src="item.mainImgPath"
                ></el-avatar>
                <div class="expert-info">
                  <div class="name">{{ item.name }}</div>
                  <div class="desc">{{ item.descs }}</div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>

      <music-photo-detail
        v-if="musicPhotoDetailVisible"
        :musicPhotoDetailVisible="musicPhotoDetailVisible"
        :fileType="fileType"
        :musicInfo="musicInfo"
        @closeMusicPhotoDialog="musicPhotoDetailVisible = false"
      ></music-photo-detail>

      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "@/styles/home.scss";
import MusicPhotoDetail from "./MusicPhotoDetail";
import Footer from "@/components/layout/Footer";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  name: "Home",
  components: {
    MusicPhotoDetail,
    Footer
  },
  data() {
    return {
      imageSrc: [
        {
          index: 0,
          src: require("../assets/image/carousel1.jpg")
        },
        {
          index: 1,
          src: require("../assets/image/carousel2.jpg")
        },
        {
          index: 2,
          src: require("../assets/image/carousel3.jpg")
        }
      ],
      imageUrl: require("../assets/image/avator-error.png"),
      fileType: "", // 音乐图片类型(image: 图片, audio: 音频)
      musicPhotoDetailVisible: false,
      musicInfo: {}
    };
  },
  computed: {
    ...mapGetters("home", [
      "bannerData",
      "videoCourse",
      "electronicBooks",
      "digitalDocument",
      "bankList",
      "newsData",
      "musicPictures",
      "expertsData"
    ]),

    token() {
      return getToken();
    }
  },
  mounted() {
    this.initPageData();
  },
  methods: {
    initPageData() {
      // 获取轮播图
      this.$store.dispatch("home/getBannerData", {
        FileResourceType: 9,
        SkipCount: 0,
        MaxResultCount: 5
      });

      // 获取视频课程数据源
      this.$store.dispatch("home/getVideoCourseList", {
        FileResourceType: 1,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 15
      });

      // 获取电子图书数据源
      this.$store.dispatch("home/getElectronicBooksList", {
        FileResourceType: 4,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 12
      });

      // 获取数字文献数据源
      this.$store.dispatch("home/getDigitalDocumentList", {
        FileResourceType: 6,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 11
      });

      // 获取测试题库数据集
      this.$store.dispatch("home/getTestQuestionBankList", {});

      // 获取新闻资讯数据源
      this.$store.dispatch("home/getNewsList", {
        FileResourceType: 10,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 5
      });

      // 获取音乐图片数据源
      this.$store.dispatch("home/getMusicPicturesList", {
        FileResourceType: 3,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 6
      });

      // 获取机构专家数据源
      this.$store.dispatch("home/getExpertsList", {
        FileResourceType: 8,
        IsNominate: 1,
        SkipCount: 0,
        MaxResultCount: 6
      });
    },

    // 点击视频课程 图片/标题 跳转视频详情页
    toVideoDetailPage(item) {
      this.$router.push({
        path: `/videoDetail/${item.id}`
      });
    },

    // 点击电子图书图片/标题跳转图书详情页
    toBookDetailPage(item) {
      this.$router.push({
        path: `/bookDetail/${item.id}`
      });
    },

    // 点击数字文献图片/标题跳转文献详情页
    toDocumentDetailPage(item) {
      this.$router.push({
        path: `/literatureDetail/${item.id}`
      });
    },

    // 点击新闻资讯跳转新闻详情页
    toNewsDetailPage(item) {
      this.$router.push({
        path: `/newsDetail/${item.id}`
      });
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
