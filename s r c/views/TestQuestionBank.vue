<template>
  <div class="paper-detail">
    <div class="wrapper">
      <div class="question-area">
        <div class="header">
          <div class="title">{{ paperInfo.paperName }}</div>
          <div class="sub-title">
            <span>{{ paperInfo.hasUseCount }}人参加测试</span>
            <span style="padding-left: 20px;">
              {{ paperInfo.publishTime | convertTime("YYYY-MM-DD HH:mm:ss") }}
            </span>
          </div>
        </div>
        <div v-for="(item, index) in questionList" :key="index" class="item">
          <div class="question-title">
            <span>
              {{ index + 1 }}、 [{{ item.topic.questionTypeName }}] [难度系数:
              {{ item.topic.degreeOfDifficultyEnum | convertQuestionDiff }}]
            </span>
            <span v-html="item.topic.topicContent"></span>
          </div>
          <div>
            <question-answer
              v-show="isStartTest"
              :ref="'qusetionAnswer_' + index"
              :questionAnswer="item.topic"
            ></question-answer>
          </div>
          <el-divider></el-divider>
        </div>
        <!-- <div class="pg">
          <pagination
            v-if="total > 0"
            :total="total"
            :page.sync="currentPageNum"
            :limit.sync="size"
            @pagination="getTableData"
          />
        </div> -->
        <div class="btn-area">
          <el-button type="primary" @click="onStartExam">开始考试</el-button>
          <el-button type="primary" @click="submit" :disabled="canSubmit">
            交卷
          </el-button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import QuestionAnswer from "./QuestionAnswer";
// import Pagination from "@/components/Pagination";
import Footer from "@/components/layout/Footer";
export default {
  name: "TestQuestionBank",
  components: {
    QuestionAnswer,
    // Pagination,
    Footer
  },
  data() {
    return {
      currentPageNum: 0,
      size: 20,
      total: 0,
      canSubmit: true, // 是否可以提交
      isStartTest: false
    };
  },
  computed: {
    ...mapGetters("testQuestion", ["questionList", "totalCount", "paperInfo"]),
    // 试卷ID
    paperId() {
      return this.$route.params.paperId;
    },
    token() {
      return getToken();
    }
  },
  watch: {
    totalCount: {
      immediate: true,
      handler(val) {
        this.total = val;
      }
    }
  },
  mounted() {
    // 获取试卷详情信息
    this.$store.dispatch("testQuestion/getPaperInfo", {
      id: this.paperId
    });

    // 获取试卷题目信息
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$store.dispatch("testQuestion/getPaperQuestionList", {
        id: this.paperId,
        skipCount: 0,
        maxResultCount: 1000
      });
    },

    // 开始考试
    onStartExam() {
      if (this.isStartTest) {
        this.$notify({
          title: "提示",
          type: "info",
          message: "当前正在考试"
        });
        return;
      }
      // 只有登录才能开始考试
      if (!this.token) {
        // this.$notify({
        //   title: "提示",
        //   type: "info",
        //   message: "需要先登录才能开始考试"
        // });
        // this.$router.push({
        //   path: "/login"
        // });
        // return;
      }
      this.canSubmit = false;
      this.isStartTest = true;
      // 记录开始考试时间
      sessionStorage.setItem(
        "startTime",
        this.$options.filters["convertTime"](new Date(), "YYYY-MM-DD HH:mm:ss")
      );
    },

    submit() {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // 试卷提交时间
      const endTime = this.$options.filters["convertTime"](
        new Date(),
        "YYYY-MM-DD HH:mm:ss"
      );
      let params = {
        userJoinPaperRecord: {
          id: "",
          userId: userInfo.id, // 用户ID
          userName: userInfo.userName, // 用户名
          startTime: sessionStorage.getItem("startTime"),
          endTime: endTime,
          paperInfo: this.paperInfo
        },
        userJoinPaperDetailList: []
      };
      params.userJoinPaperDetailList = this.questionList.map((item, index) => {
        let form = this.$refs["qusetionAnswer_" + index][0].form;
        return {
          id: "",
          paperTest: item,
          userAnswerResult: form.userAnswerResult,
          userJoinPaperId: this.paperId
        };
      });
      let msg = "";
      if (this.isFinishPaper(params.userJoinPaperDetailList)) {
        msg = "存在未完成的题目，是否确认交卷?";
      } else {
        msg = "是否确认交卷?";
      }
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("testQuestion/createUserTestRecord", params)
            .then(() => {
              this.$router.push({
                path: "/"
              });
            });
        })
        .catch(() => {});
    },

    // 判断试卷是否已经做完
    isFinishPaper(arr) {
      return arr.some(el => {
        return !el.userAnswerResult.length || el.userAnswerResult.includes("");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

$fontFamily: PingFang SC, "微软雅黑";

.paper-detail {
  width: 100%;
  background: #f1f2f4;
  .wrapper {
    margin: 0 auto 33px;
    max-width: 1200px;
    min-width: 990px;
    .question-area {
      padding: 0 32px;
      background-color: #fff;
      text-align: left;
      .header {
        padding: 30px 0;
        .title {
          color: #333;
          @include text-font(24px, $fontFamily, 500);
        }
        .sub-title {
          color: #999;
          @include text-font(14px, $fontFamily, 400);
        }
      }
      .item {
        .question-title {
          @include text-font(18px, $fontFamily, 400);
        }
      }
      .pg {
        text-align: center;
      }
      .btn-area {
        text-align: center;
        padding-bottom: 40px;
      }
    }
  }
}
</style>
