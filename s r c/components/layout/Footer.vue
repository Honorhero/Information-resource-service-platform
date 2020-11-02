<template>
  <div id="site-footer">
    <div class="site-info">
      <el-row type="flex" align="middle" class="content">
        <el-col :span="8" class="item">
          <img class="img-logo" src="@/assets/image/bottomlogo.png" alt />
        </el-col>
        <el-col :span="8" class="item">
          <div class="text">
            <span> 客服专线：400-8989-888 <br />邮箱:market@bjadks.com </span>
          </div>
        </el-col>
        <el-col :span="8" class="QR-code">
          <div class="code-text">
            <span>公众号二维码</span>
          </div>
          <div class="img-code">
            <img src="@/assets/image/erweima.png" alt />
          </div>
        </el-col>
      </el-row>
      <!-- <el-divider direction="vertical"></el-divider> -->
    </div>
    <div class="site-copyright">
      <div class="copy">
        Copyright &copy; 2020 Tuheng. All Rights Reserved.
      </div>
      <div class="text">
        <span
          >江苏图衡信息科技有限公司 版权所有 | 隐私政策 | 站点地图 | 侵权投诉 |
          问题反馈 | 帮助
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/layout/footer.scss";
export default {
  name: "Footer"
};
</script>

<style></style>
