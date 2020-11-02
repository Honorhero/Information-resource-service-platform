<template>
  <el-dialog
    title="音乐图片详情"
    :visible.sync="musicPhotoDetailVisible"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :before-close="handleClose"
  >
    <div class="music-photo-detail">
      <el-image
        class="img"
        :src="musicInfo.mainImgPath"
        fit="contain"
        @click="toVideoDetailPage(item)"
      ></el-image>
      <div class="aSound">
        <audio
          :src="musicInfo.filePath"
          controls="controls"
          class="audio-player"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
      <!-- <div id="aSound">
        <sound-manager :musicInfo="musicInfo"></sound-manager>
      </div> -->
    </div>
  </el-dialog>
</template>

<script>
// import SoundManager from "./SoundManager";
export default {
  name: "MusicPhotoDetail",
  components: {
    // SoundManager
  },
  props: {
    musicPhotoDetailVisible: {
      type: Boolean,
      default: false
    },

    // 文件类型
    fileType: {
      type: String,
      validator: value => {
        return ["image", "audio"].includes(value);
      }
    },

    // 当前音乐图片详情信息
    musicInfo: Object
  },
  mounted() {
    this.initAudioPlayer();
  },
  methods: {
    initAudioPlayer() {
      // this.soundManager.setup({
      //   // url: this.musicInfo.filePath,
      //   // use soundmanager2-nodebug-jsmin.js, or disable debug mode (enabled by default) after development/testing
      //   debugMode: false,
      //   onready: () => {
      //     let mySound = this.soundManager.createSound({
      //       id: "aSound",
      //       url: this.musicInfo.filePath,
      //       autoLoad: true, // 自动加载
      //       autoPlay: false, // 自动播放
      //       volume: 50 // 音量
      //     });
      //     mySound.play();
      //   }
      // });
    },

    handleClose() {
      this.$emit("closeMusicPhotoDialog");
    }
  }
};
</script>

<style lang="scss" scoped>
.music-photo-detail {
  .img {
    width: 100%;
    // height: auto;
    height: 400px;
  }
  .aSound {
    text-align: center;
    .audio-player {
      outline: none;
    }
  }
}
</style>
