<template>
  <div class="login-homepage">
    <div class="login-homepage-content">
      <div class="login-main">
        <div class="login-content">
          <el-tabs v-model="activeName">
            <el-tab-pane label="账户密码登录" name="first">
              <el-form
                :model="loginForm"
                :rules="rules"
                ref="loginForm"
                class="login-form"
              >
                <el-form-item prop="userNameOrEmail" class="form-item">
                  <el-input
                    v-model="loginForm.userNameOrEmail"
                    prefix-icon="el-icon-user"
                    placeholder="用户名/邮箱"
                    maxlength="50"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password" class="form-item">
                  <el-input
                    type="password"
                    v-model="loginForm.password"
                    prefix-icon="el-icon-unlock"
                    placeholder="密码"
                    maxlength="50"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 0;line-height: 1;">
                  <div class="error-msg">{{ errorMsg }}</div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="onLogin('loginForm')"
                    style="width: 100%;"
                  >
                    登 录
                  </el-button>
                </el-form-item>
                <!-- <el-form-item>
                  <el-row type="flex" justify="space-between">
                    <el-checkbox>记住我</el-checkbox>
                    <el-link :underline="false">忘记密码？</el-link>
                  </el-row>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    // 校验用户名
    let validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      callback();
    };
    // 校验密码
    let validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      activeName: "first",
      loginForm: {
        userNameOrEmail: "",
        password: ""
      },
      rules: {
        userNameOrEmail: [
          {
            validator: validateUserName,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("user", ["token", "errorMsg"])
  },
  watch: {
    token: {
      handler(val) {
        if (val) {
          // 登录成功回到首页
          this.$router.push({
            path: "/home"
          });
          this.$store.dispatch("user/getUserInfo");
        }
      }
    }
  },
  methods: {
    onLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
      });
      let formData = new FormData();
      formData.append("client_id", "BaseAPI_App");
      formData.append("scope", "BaseAPI");
      formData.append("client_secret", "1q2w3e*");
      formData.append("grant_type", "password");
      formData.append("username", this.loginForm.userNameOrEmail);
      formData.append("password", this.loginForm.password);
      this.$store.dispatch("user/login", formData);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-homepage {
  flex: 1 1;
  -webkit-box-flex: 1;
  display: flex;
  justify-content: center;
  // align-items: center;
  border-radius: 2px;
  height: calc(100vh - 86px);
  background-repeat: no-repeat;
  // background-color: #b8e5f8;
  .login-homepage-content {
    margin-bottom: 20px;
    .login-main {
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      box-sizing: border-box;
      margin: 20vh 0;
      min-width: 0;
      padding: 0;
      box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
      border-radius: 2px;
      background-color: #fff;
      width: 400px;
      overflow: hidden;
      .login-content {
        padding: 10px 24px;
        .error-msg {
          text-align: left;
          color: #ca0c16;
          line-height: 1;
        }
      }
    }
  }
}
</style>
