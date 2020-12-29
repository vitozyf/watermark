## 水印插件

### 默认配置

```javascript
{
  text: '水印文字', /// 水印元素字符
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
}
```

### 代码演示

```javascript
watermark(document.body, {
  text: '<span>测试链接</span>',
});
```

### API

```javascript
wm.disconnect(); // 终止监测水印动作
```

### 事件

```javascript
wm.on('change', handler); // 接管水印动作事件处理，处理参数（mutationsList）
```

### 注意事项

- 内部元素使用的绝对定位(`absolute`)，传入的选择器或 dom，其本身若没有定位样式，则会向上查找最近的定位元素定位。
- 如果不传入`Interval`间隔参数，则按`Count`数量在水平方向和垂直方向平分空间。
- `Offset`偏移参数只在`Interval`间隔参数存在时生效。
- 默认水印修改后会修改目标元素的 html 为空，可使用`change`事件接管
