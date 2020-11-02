<template>
  <div class="sm2-bar-ui compact full-width">
    <div class="bd sm2-main-controls">
      <div class="sm2-inline-texture"></div>
      <div class="sm2-inline-gradient"></div>

      <div class="sm2-inline-element sm2-button-element">
        <div class="sm2-button-bd">
          <a href="#play" class="sm2-inline-button sm2-icon-play-pause"
            >Play / pause</a
          >
        </div>
      </div>

      <div class="sm2-inline-element sm2-inline-status">
        <div class="sm2-playlist">
          <div class="sm2-playlist-target">
            <!-- playlist <ul> + <li> markup will be injected here -->
            <!-- if you want default / non-JS content, you can put that here. -->
            <noscript><p>JavaScript is required.</p></noscript>
            <p>1111</p>
          </div>
        </div>

        <div class="sm2-progress">
          <div class="sm2-row">
            <div class="sm2-inline-time">0:00</div>
            <div class="sm2-progress-bd">
              <div class="sm2-progress-track">
                <div class="sm2-progress-bar"></div>
                <div class="sm2-progress-ball">
                  <div class="icon-overlay"></div>
                </div>
              </div>
            </div>
            <div class="sm2-inline-duration">0:00</div>
          </div>
        </div>
      </div>

      <div class="sm2-inline-element sm2-button-element sm2-volume">
        <div class="sm2-button-bd">
          <span
            class="sm2-inline-button sm2-volume-control volume-shade"
          ></span>
          <a href="#volume" class="sm2-inline-button sm2-volume-control"
            >volume</a
          >
        </div>
      </div>
    </div>

    <div class="bd sm2-playlist-drawer sm2-element">
      <div class="sm2-inline-texture">
        <div class="sm2-box-shadow"></div>
      </div>

      <!-- playlist content is mirrored here -->

      <div class="sm2-playlist-wrapper">
        <ul class="sm2-playlist-bd">
          <li>
            <a
              href="http://freshly-ground.com/data/audio/sm2/Adrian%20Glynn%20-%20Seven%20Or%20Eight%20Days.mp3"
              ><b>Adrian Glynn</b> - Seven Or Eight Days</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="../utils/bar-ui.js"></script>

<script>
export default {
  name: "SoundManager",
  props: {
    // 当前音乐图片详情信息
    musicInfo: Object
  },
  mounted() {
    this.soundManager.setup({
      // url: this.musicInfo.filePath,
      // use soundmanager2-nodebug-jsmin.js, or disable debug mode (enabled by default) after development/testing
      debugMode: false,
      onready: () => {
        let mySound = this.soundManager.createSound({
          id: "aSound",
          url: this.musicInfo.filePath,
          autoLoad: true, // 自动加载
          autoPlay: false, // 自动播放
          volume: 50 // 音量
        });
        mySound.play();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/bar-ui.css"; // 音乐播放器样式
</style>
