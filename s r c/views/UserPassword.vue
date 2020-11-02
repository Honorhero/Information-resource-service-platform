<template>
  <div class="pwd-container">
    <div class="pwd-area">
      <el-form
        :model="pwdForm"
        :rules="rules"
        ref="pwdForm"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="currentPassword">
          <el-input
            v-model="pwdForm.currentPassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pwdForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="pwdForm.confirmPassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 300px;"
            @click="submitUserInfo('pwdForm')"
            >修 改 密 码</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPassword",
  props: {
    activeIndex: Number
  },
  data() {
    let validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value === this.pwdForm.currentPassword) {
        callback(new Error("新密码不能与旧密码一致!"));
      } else {
        callback();
      }
    };
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isEditUserInfo: false,
      pwdForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        currentPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: validateNewPass, trigger: "blur" }
        ],
        confirmPassword: [{ validator: validateConfirmPass, trigger: "blur" }]
      }
    };
  },
  watch: {
    activeIndex: {
      handler(val) {
        if (val !== 1) {
          this.$refs.pwdForm.resetFields();
        }
      }
    }
  },
  methods: {
    editUserInfo() {
      this.isEditUserInfo = true;
    },

    submitUserInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.$store.dispatch("user/changeUserPwd", {
            currentPassword: this.pwdForm.currentPassword,
            newPassword: this.pwdForm.newPassword
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pwd-container {
  margin-left: 20px;
  padding: 20px 0;
  .pwd-area {
    margin: 0 20px;
    padding: 20px 0;
    width: 400px;
  }
}
</style>
