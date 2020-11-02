<template>
  <div class="register-homepage">
    <div class="register-homepage-content">
      <div class="register-main">
        <div class="register-content">
          <el-form
            :model="registerForm"
            :rules="rules"
            ref="registerForm"
            class="register-form"
          >
            <el-form-item prop="userName" class="form-item">
              <el-input
                v-model="registerForm.userName"
                placeholder="用户名"
                clearable
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" class="form-item">
              <el-input
                type="password"
                v-model="registerForm.password"
                placeholder="密码"
                clearable
                prefix-icon="el-icon-unlock"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPassword" class="form-item">
              <el-input
                type="password"
                v-model="registerForm.checkPassword"
                placeholder="确认密码"
                clearable
                prefix-icon="el-icon-unlock"
              ></el-input>
            </el-form-item>
            <el-form-item prop="emailAddress" class="form-item">
              <el-input
                v-model="registerForm.emailAddress"
                placeholder="邮箱"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;line-height: 1;">
              <div class="error-msg">{{ errorMsg }}</div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onRegister('registerForm')"
                style="width: 100%;"
              >
                立 即 注 册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Register",
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
      if (this.registerForm.checkPassword !== "") {
        this.$refs.registerForm.validateField("checkPassword");
      }
      callback();
    };
    let validateCheckPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入密码"));
      }
      if (value !== this.registerForm.password) {
        callback("两次输入密码不一致");
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      registerForm: {
        userName: "",
        password: "",
        checkPassword: "",
        emailAddress: ""
      },
      rules: {
        userName: [
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
        ],
        checkPassword: [
          {
            validator: validateCheckPwd,
            trigger: "blur"
          }
        ],
        emailAddress: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ]
      },
      errorMsg: ""
    };
  },
  computed: {
    ...mapGetters("user", ["registerErrorMsg", "registerSuccess"])
  },
  watch: {
    registerErrorMsg: {
      handler(val) {
        if (val) {
          this.errorMsg = val;
        }
      }
    },

    registerSuccess: {
      handler(val) {
        if (val) {
          this.$router.push({
            path: "/login"
          });
        }
      }
    }
  },
  methods: {
    onRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
      });
      this.$store.dispatch("user/registerNewAccount", {
        userName: this.registerForm.userName,
        password: this.registerForm.password,
        emailAddress: this.registerForm.emailAddress,
        appName: "libweb"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register-homepage {
  flex: 1 1;
  -webkit-box-flex: 1;
  display: flex;
  justify-content: center;
  // align-items: center;
  border-radius: 2px;
  height: calc(100vh - 86px);
  background-repeat: no-repeat;
  // background-color: #b8e5f8;
  .register-homepage-content {
    margin-bottom: 20px;
    .register-main {
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      box-sizing: border-box;
      margin: 20vh 0;
      min-width: 0;
      padding: 20px 0 0;
      box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
      border-radius: 2px;
      background-color: #fff;
      width: 400px;
      overflow: hidden;
      .register-content {
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
