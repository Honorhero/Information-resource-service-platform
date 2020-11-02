<template>
  <div>
    <div v-if="form.questionTypeName === '单选题'" class="answer-area">
      <el-row
        v-for="(item, index) in form.topicOptions"
        :key="index"
        class="item"
      >
        <el-radio v-model="checkedRadio" :label="item">
          {{ ids[index] }}、{{ item }}
        </el-radio>
      </el-row>
    </div>
    <div v-if="form.questionTypeName === '多选题'" class="answer-area">
      <el-row
        v-for="(item, index) in form.topicOptions"
        :key="index"
        class="item"
      >
        <el-checkbox v-model="checkedAll[index]">
          {{ item }}
        </el-checkbox>
      </el-row>
    </div>
    <div v-if="form.questionTypeName === '判断题'" class="answer-area">
      <el-row class="item">
        <el-radio-group v-model="checkedJudge" class="radio-group">
          <el-radio :label="'正确'">正确</el-radio>
          <el-radio :label="'错误'">错误</el-radio>
        </el-radio-group>
      </el-row>
    </div>
    <div v-if="form.questionTypeName === '填空题'" class="answer-area">
      <el-row type="flex" :gutter="10" class="item">
        <el-col :span="3" v-for="(item, index) in blankAnwserData" :key="index">
          <el-input v-model="item.answer"></el-input>
        </el-col>
      </el-row>
    </div>
    <div v-if="form.questionTypeName === '简答题'" class="answer-area">
      <el-row class="item">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入答案"
          v-model="shortAnswer"
        >
        </el-input>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionAnswer",
  props: {
    questionAnswer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {},
      ids: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      checkedRadio: "", // 单选题
      checkedAll: [], // 多选题
      checkedJudge: "", // 判断题
      shortAnswer: "", // 简答题
      blankAnwserData: [] // 填空题
    };
  },
  watch: {
    // 单选题选项改变
    checkedRadio: {
      immediate: true,
      handler() {
        this.handleUserAnswer(this.form.questionTypeName);
      }
    },

    // 多选题选项改变
    checkedAll: {
      immediate: true,
      deep: true,
      handler() {
        this.handleUserAnswer(this.form.questionTypeName);
      }
    },

    // 判断题选项改变
    checkedJudge: {
      immediate: true,
      handler() {
        this.handleUserAnswer(this.form.questionTypeName);
      }
    },

    // 简答题输入内容改变
    shortAnswer: {
      immediate: true,
      handler() {
        this.handleUserAnswer(this.form.questionTypeName);
      }
    },

    // 填空题输入内容改变
    blankAnwserData: {
      immediate: true,
      deep: true,
      handler() {
        this.handleUserAnswer(this.form.questionTypeName);
      }
    }
  },
  mounted() {
    this.form = { ...this.questionAnswer };
    this.form.userAnswerResult = [];
    this.initPageData(this.form.questionTypeName);
  },
  methods: {
    initPageData(questionTypeName) {
      if (questionTypeName === "多选题") {
        // let indexArr = [];
        // this.form.topicAnswers.forEach(answer => {
        //   const _index = this.ids.findIndex(el => el === answer);
        //   if (_index !== -1 && !indexArr.includes(_index)) {
        //     indexArr.push(_index);
        //   }
        // });
        // this.$nextTick(() => {
        //   this.form.topicOptions.forEach((item, index) => {
        //     if (indexArr.includes(index)) {
        //       this.$set(this.checkedAll, index, true);
        //     } else {
        //       this.$set(this.checkedAll, index, false);
        //     }
        //   });
        // });
      } else if (questionTypeName === "单选题") {
        // this.checkedRadio = this.form.topicAnswers[0];
      } else if (questionTypeName === "判断题") {
        // this.handleJudgeAnwser();
      } else if (questionTypeName === "填空题") {
        if (!this.form.topicAnswers) {
          this.blankAnwserData = [];
          return;
        }
        this.blankAnwserData = this.form.topicAnswers.map(() => {
          return {
            answer: ""
          };
        });
        // this.anwserIsOrder = this.form.distinguishOrder;
        // this.isIgnordeCase = this.form.ignoreCase;
        // if (!this.form.topicAnswers || !this.form.topicAnswers[0]) {
        //   this.blankAnwserData = [];
        //   return;
        // }
        // this.handleBlankAnwserData(this.form.topicAnswers[0]);
      }
    },

    handleUserAnswer(questionTypeName) {
      if (questionTypeName === "多选题") {
        if (!this.checkedAll.length || !this.checkedAll.includes(true)) {
          this.form.userAnswerResult = [];
          return;
        }
        this.form.userAnswerResult = this.checkedAll.map((item, index) => {
          return item ? this.form.topicOptions[index] : "";
        });
        this.form.userAnswerResult = this.form.userAnswerResult.filter(
          el => el
        );
      } else if (questionTypeName === "单选题") {
        this.form.userAnswerResult = [];
        if (!this.checkedRadio) {
          this.form.userAnswerResult = [];
          return;
        }
        this.form.userAnswerResult[0] = this.checkedRadio;
      } else if (questionTypeName === "判断题") {
        this.form.userAnswerResult = [];
        if (!this.checkedJudge) {
          this.form.userAnswerResult = [];
        }
        this.form.userAnswerResult[0] = this.checkedJudge;
      } else if (questionTypeName === "简答题") {
        this.form.userAnswerResult = [];
        if (!this.shortAnswer) {
          this.form.userAnswerResult = [];
        }
        this.form.userAnswerResult[0] = this.shortAnswer;
      } else if (questionTypeName === "填空题") {
        if (!this.blankAnwserData.length) {
          this.form.userAnswerResult = [];
          return;
        }
        this.form.userAnswerResult = this.blankAnwserData.map(item => {
          return item.answer;
        });
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.answer-area {
  width: 100%;
  // color: #c0c4cc;
  font-size: 14px;
  .item {
    display: flex;
    padding: 10px 25px;
    width: 100%;
    height: auto;
    white-space: normal;
    overflow: hidden;
  }
}
.analysis {
  color: #c0c4cc;
  white-space: pre-line;
  word-wrap: break-word;
  width: 100%;
  height: auto;
  padding: 10px 25px;
  overflow: hidden;
  font-size: 14px;
  .text {
    display: inline-block;
    vertical-align: top;
  }
}
</style>
