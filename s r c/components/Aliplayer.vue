<!-- Aliplayer 视频组件 -->
<template>
  <div class="prism-player" :id="playerId" :style="playerStyle"></div>
</template>

<script>
export default {
  name: "Aliplayer",
  props: {
    playerStyle: {
      type: String,
      default: ""
    },
    // aliplayer代码路径
    aliplayerSdkPath: {
      type: String,
      default: "https://g.alicdn.com/de/prismplayer/2.9.0/aliplayer-min.js"
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    //播放器自动循环播放。
    rePlay: {
      type: Boolean,
      default: false
    },
    // 播放内容是否为直播，直播会禁止用户拖动滚动条
    isLive: {
      type: Boolean,
      default: false
    },
    // H5是否内置播放，有的Android浏览器不起作用
    playsinline: {
      type: Boolean,
      default: false
    },
    // 播放器宽度,可形如‘100%’或者‘100px’ chrome浏览器下flash播放器分别不能小于397x297
    width: {
      type: String,
      default: "100%"
    },
    // 同width
    height: {
      type: String,
      default: "500px"
    },
    //视频的高度大小
    videoWidth: {
      type: String,
      default: "100%"
    },
    //视频的宽度大小
    videoHeight: {
      type: String,
      default: ""
    },
    //播放器自动加载，目前仅h5可用
    preload: {
      type: Boolean,
      default: false
    },
    // 控制面板的实现，默认为‘hover’,可选的值为：‘click’、‘hover’、‘always’
    controlBarVisibility: {
      type: String,
      default: "hover"
    },
    // 指定使用H5播放器
    useH5Prism: {
      type: Boolean,
      default: false
    },
    // 指定使用Flash播放器
    useFlashPrism: {
      type: Boolean,
      default: false
    },
    // 媒体转码服务的媒体Id
    vid: {
      type: String,
      default: ""
    },
    // 播放权证
    playauth: {
      type: String,
      default: ""
    },
    /**
     * 视频播放地址url：
     * - 单独url。
     * - 默认状态，表示使用vid+playauth。
     * - source播放方式优先级最高。
     * source支持多清晰度设置：
     * source:’{“HD”:”address1”,”SD”:”address2”}’
     */
    source: {
      type: String,
      default: ""
    },
    // 播放器默认封面图片，需要autoplay为’false’时，才生效，Flash播放器封面也需要开启允许跨域访问
    cover: {
      type: String,
      default: ""
    },
    // 指定播放地址格式，只有使用vid的播放方式时支持, 可选值为’mp4’、’m3u8’、’flv’、’mp3’，默认为空，仅H5支持
    format: {
      type: String,
      default: ""
    },
    // 功能组件布局配置，不传该字段使用默认布局。传false隐藏所有功能组件
    skinLayout: {
      type: [Array, Boolean],
      default: arr => {
        if (Array.isArray(arr)) {
          return [];
        }
        return false;
      }
    },
    // 声明视频播在界面上的位置，默认为“center”。可选值为：“top”，“center”
    x5_video_position: {
      type: String,
      default: "top"
    },
    // 声明启用同层H5播放器，启用时设置的值为‘h5’
    x5_type: {
      type: String,
      default: "h5"
    },
    // 声明视频播放时是否进入到TBS的全屏模式，默认为false。当需要把视频做为背景时，设置为true
    x5_fullscreen: {
      type: Boolean,
      default: false
    },
    // 声明TBS播放器支持的方向，可选值：landscape：横屏, portraint：竖屏
    x5_orientation: {
      type: Number,
      default: 2
    },
    // 延迟播放时间，单位为秒
    autoPlayDelay: {
      type: Number,
      default: 0
    },
    // 延迟播放提示文本
    autoPlayDelayDisplayText: {
      type: String
    },
    /**
     * 国际化，默认为‘zh-cn’。
     如果未设置，则采用浏览器语言。
      可选值为‘zh-cn’、‘en-us’或其它值。
      * */
    language: {
      type: String,
      default: "zh-cn"
    },
    /**
     * 自定义国际化文本json结构，key的值需要和language属性值对应起来。
     例子：{jp:{Play:”Play”}}
      * */
    languageTexts: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      playerId:
        "aliplayer_" +
        Math.random()
          .toString(36)
          .substr(2),
      scriptTagStatus: 0,
      isReload: false,
      instance: null
    };
  },
  created() {
    if (window.Aliplayer !== undefined) {
      // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
      this.scriptTagStatus = 2;
      this.initAliplayer();
    } else {
      // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
      this.insertScriptTag();
    }
  },
  mounted() {
    if (window.Aliplayer !== undefined) {
      // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
      this.scriptTagStatus = 2;
      this.initAliplayer();
    } else {
      // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
      this.insertScriptTag();
    }
  },
  methods: {
    insertScriptTag() {
      const _this = this;
      let playerScriptTag = document.getElementById("playerScriptTag");
      // 如果这个tag不存在，则生成相关代码tag以加载代码
      if (playerScriptTag === null) {
        playerScriptTag = document.createElement("script");
        playerScriptTag.type = "text/javascript";
        playerScriptTag.src = this.aliplayerSdkPath;
        playerScriptTag.id = "playerScriptTag";
        let s = document.getElementsByTagName("head")[0];
        s.appendChild(playerScriptTag);
      }
      if (playerScriptTag.loaded) {
        _this.scriptTagStatus++;
      } else {
        playerScriptTag.addEventListener("load", () => {
          _this.scriptTagStatus++;
          playerScriptTag.loaded = true;
          _this.initAliplayer();
        });
      }
      _this.initAliplayer();
    },

    initAliplayer() {
      const _this = this;
      // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
      if (
        _this.scriptTagStatus === 2 &&
        (_this.instance === null || _this.reloadPlayer)
      ) {
        _this.instance && _this.instance.dispose();

        // document.querySelector("#" + _this.playerId).innerHTML = "";

        // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
        // 所以，我们只能在 nextTick 里面初始化 Aliplayer
        _this.$nextTick(() => {
          // eslint-disable-next-line no-undef
          _this.instance = window.Aliplayer({
            id: _this.playerId,
            source: _this.source,
            width: _this.width,
            height: _this.height,
            autoplay: _this.autoplay,
            isLive: _this.isLive,
            cover: _this.cover,
            rePlay: _this.rePlay,
            playsinline: _this.playsinline,
            preload: _this.preload,
            autoPlayDelay: _this.autoPlayDelay,
            autoPlayDelayDisplayText: _this.autoPlayDelayDisplayText,
            language: _this.language,
            controlBarVisibility: _this.controlBarVisibility,
            videoWidth: _this.videoWidth,
            videoHeight: _this.videoHeight,
            useH5Prism: _this.useH5Prism
          });
        });
      }
    },

    /**
     *获取视频总时长，返回的单位为秒
     * @returns 返回的单位为秒
     */
    getDuration() {
      return this.instance.getDuration();
    },

    /**
     *直接播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换暂不支持直播rtmp流切换
     *@argument url 视频地址
     *@argument time 跳转到多少秒
     */
    loadByUrl(url, time) {
      this.instance.loadByUrl(url, time);
    },

    /**
     * 设置封面地址
     * @param cover 封面地址
     */
    setCover(cover) {
      if (this.instance) {
        this.instance.setCover(cover);
      }
    },

    reloadPlayer() {
      this.isReload = true;
      this.initAliplayer();
      this.isReload = false;
    }
  }
};
</script>

<style>
@import "https://g.alicdn.com/de/prismplayer/2.9.0/skins/default/aliplayer-min.css";
</style>
