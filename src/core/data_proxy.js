import helper from './helper';
const defaultOptions = {
  text: '水印文字', /// 水印元素html字符串
  itemWidth: 'auto', // 水印元素宽度
  itemHeight: 'auto', // 水印元素高度
  color: 'rgba(0,0,0,.1)', // 水印文字颜色
  rotate: -15, // 旋转角度
  horizontalCount: 10, // 水平方向数量
  verticalCount: 10, // 垂直方向数量
  horizontalInterval: 0, // 水平方向间隔
  verticalInterval: 0, // 垂直方向间隔
  horizontalOffset: 0, // 水平方向偏移
  verticalOffset: 0, // 垂直方向偏移
};
const EventMap = new Map();

export default class DataProxy {
  constructor(opt = {}) {
    this.options = helper.merge(defaultOptions, opt);
    this.eventMap = EventMap;
  }
}
