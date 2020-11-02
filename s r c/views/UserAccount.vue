<template>
  <div class="container">
    <div class="user-info">
      <div class="user-avator" @mouseleave="isShowEditMask = false">
        <div
          @click="choosePicture"
          @mouseover="isShowEditMask = true"
          class="avator-area"
        >
          <el-avatar :size="150">
            <el-image class="avatar-image" :src="userAccountInfo.avatarImage">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 30px;"></i>
              </div>
            </el-image>
          </el-avatar>
        </div>
        <label class="uploadPicture-wrapper">
          <input
            ref="imageInput"
            type="file"
            accept="image/png,image/jpeg"
            class="uploadPicture-input"
            @change="uploadUserAvatar"
          />
          <div
            class="user-avatar-mask"
            :class="isShowEditMask ? '' : 'mask-hidden'"
          >
            <div class="mask-inner">
              <div class="mask-content">
                <i
                  class="el-icon-camera-solid"
                  style="color: #fff;font-size: 30px;"
                ></i>
                <div class="text">修改我的头像</div>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div class="info-area">
        <div class="title-item">
          <h1>{{ userAccountInfo.userName }}</h1>
        </div>
        <div class="item">
          <div class="text">名称</div>
          <div>{{ userAccountInfo.name }}</div>
        </div>
        <div class="item">
          <div class="text">昵称</div>
          <div>{{ userAccountInfo.surname }}</div>
        </div>
        <div class="item">
          <div class="text">邮箱</div>
          <div>{{ userAccountInfo.email }}</div>
        </div>
        <div class="item">
          <div class="text">电话号码</div>
          <div>{{ userAccountInfo.phoneNumber }}</div>
        </div>
        <div class="btn-area">
          <el-button
            v-show="!isEditUserInfo"
            plain
            icon="el-icon-edit"
            @click="editUserInfo"
          >
            编辑个人资料
          </el-button>
          <el-button v-show="isEditUserInfo" @click="cancelEdit">
            取消编辑
          </el-button>
        </div>
      </div>
    </div>
    <div v-show="isEditUserInfo" class="edit-area">
      <el-form
        :model="userInfoForm"
        :rules="rules"
        ref="userInfoForm"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="userInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="surname">
          <el-input v-model="userInfoForm.surname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfoForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phoneNumber">
          <el-input v-model="userInfoForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 300px;"
            @click="submitUserInfo('userInfoForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAccount",
  props: {
    userAccountInfo: Object
  },
  data() {
    return {
      isEditUserInfo: false,
      userInfoForm: {
        userName: "",
        name: "",
        surname: "",
        email: "",
        phoneNumber: ""
      },
      rules: {
        email: [
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        phoneNumber: [
          {
            pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ]
      },
      isShowEditMask: false
    };
  },
  watch: {
    userAccountInfo: {
      immediate: true,
      deep: true,
      handler(val) {
        for (let key of Object.keys(this.userInfoForm)) {
          this.userInfoForm[key] = val[key];
        }
      }
    }
  },
  methods: {
    editUserInfo() {
      this.isEditUserInfo = true;
      for (let key of Object.keys(this.userInfoForm)) {
        this.userInfoForm[key] = this.userAccountInfo[key];
      }
    },

    cancelEdit() {
      this.isEditUserInfo = false;
      this.$refs.userInfoForm.resetFields();
    },

    submitUserInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.$store.dispatch("user/changeUserInfo", this.userInfoForm);
        }
      });
    },

    // 选择头像图片
    choosePicture() {
      this.$refs.imageInput.click();
    },

    // 上传用户头像
    uploadUserAvatar(e) {
      let file = e.target.files[0];
      let formData = new FormData(); // 创建formData对象
      formData.append("file", file);
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        this.$notify({
          title: "提示",
          type: "info",
          message: "请上传jpg/png格式的图片"
        });
        return false;
      }
      this.$store.dispatch("user/uploadUserAvatar", formData);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-left: 20px;
  padding: 20px 0;
  .user-info {
    display: flex;
    width: 100%;
    .user-avator {
      padding: 0;
      cursor: pointer;
    }
    .avator-area {
      width: 150px;
      height: 150px;
    }
    .avatar-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .uploadPicture-wrapper {
      position: relative;
      .uploadPicture-input {
        display: none;
      }
      .user-avatar-mask {
        position: absolute;
        left: -75px;
        top: -150px;
        width: 150px;
        height: 150px;
        transition: opacity 0.2s ease-in;
        cursor: pointer;
        .mask-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #121212;
          opacity: 0.4;
          .mask-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            .text {
              color: #fff;
              font-size: 14px;
            }
          }
        }
      }
      .user-avatar-mask.mask-hidden {
        pointer-events: none;
        opacity: 0;
      }
    }
    .info-area {
      width: 100%;
      margin: 0 20px;
      text-align: left;
      font-family: PingFang SC, "微软雅黑";
      .title-item {
        margin-bottom: 10px;
      }
      .item {
        display: flex;
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 400;
        .text {
          width: 100px;
        }
      }
      .btn-area {
        text-align: right;
      }
    }
  }
  .edit-area {
    margin: 0 20px;
    padding: 20px 0;
    width: 400px;
  }
}
</style>
