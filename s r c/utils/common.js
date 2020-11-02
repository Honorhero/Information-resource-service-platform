export default {
  /**
   * 时间过滤条件默认取当前年份往前十年
   * @param {number} curYear - 当前年
   */
  setTimeFilterData(curYear) {
    let years = ["全部"];
    for (let i = 10; i > 0; i--) {
      years.push(curYear--);
    }
    return years;
  },

  /**
   * 判断文件类型是否为图片
   * @param {string} ext - 文件拓展名
   */
  isAssetTypeAnImage(ext) {
    return [
      "png",
      "jpg",
      "jpeg",
      "bmp",
      "gif",
      "webp",
      "psd",
      "svg",
      "tiff"
    ].includes(ext.toLowerCase());
  }
};
