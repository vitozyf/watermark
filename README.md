## Watermark

### Introduction

```javascript
<script src="dist/watermark.js"></script>
```

### Default Config

```javascript
{
  text: '水印文字',
  itemWidth: 'auto',
  itemHeight: 'auto',
  color: 'rgba(0,0,0,.1)',
  rotate: -15,
  horizontalCount: 10,
  verticalCount: 10,
  horizontalInterval: 0, // Interval
  verticalInterval: 0, // Interval
  horizontalOffset: 0, // Offset
  verticalOffset: 0, // Offset
}
```

### Use

> watermark(Eelement | QueryString, Config)

```javascript
let wm = watermark(document.body, {
  text: 'test',
});
```

### API

```javascript
wm.disconnect(); // stop connect
```

### Event

```javascript
wm.on('change', handler);
```

### Announcements

- 内部元素使用的绝对定位(`absolute`)，传入的选择器或 dom，其本身若没有定位样式，则会向上查找最近的定位元素定位。
- 如果不传入`Interval`间隔参数，则按`Count`数量在水平方向和垂直方向平分空间。
- `Offset`偏移参数只在`Interval`间隔参数存在时生效。
- 默认水印修改后会修改目标元素的 html 为空，可使用`change`事件接管

### License

[MIT](https://choosealicense.com/licenses/mit/)
