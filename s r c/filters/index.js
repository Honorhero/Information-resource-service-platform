import Moment from "moment";
// 价格过滤器
export function filterPrice(val) {
  return val === 0 ? "免费" : val;
}

// 时间过滤器
export function convertTime(date, format) {
  return Moment(date).format(format);
}

// 资源类别过滤器
export function filterResourceType(val) {
  let resourceTypeName = "";
  switch (val) {
    case 1:
      resourceTypeName = "视频课程";
      break;
    case 4:
      resourceTypeName = "电子图书";
      break;
    case 6:
      resourceTypeName = "数字文献";
      break;
    case 10:
      resourceTypeName = "新闻资讯";
      break;
    case 3:
      resourceTypeName = "音乐图片";
      break;
    default:
      break;
  }
  return resourceTypeName;
}

/**
 * 试卷难度过滤器
 * @param {number} val
 */
export function convertQuestionDiff(val) {
  let questionDiff = "";
  switch (val) {
    case 0:
      questionDiff = "低";
      break;
    case 1:
      questionDiff = "中";
      break;
    case 2:
      questionDiff = "高";
      break;
    default:
      questionDiff = "";
      break;
  }
  return questionDiff;
}
