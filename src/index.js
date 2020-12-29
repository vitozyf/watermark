import { cssPrefix } from './config';
import { h } from './components/element';
import DataProxy from './core/data_proxy';
// import './index.scss';

class Watermark {
  constructor(selectors, options = {}) {
    if (typeof selectors === 'string') {
      selectors = document.querySelector(selectors);
    }
    this.targetEl = selectors;
    this.data = new DataProxy(options);
    this.rootEl = h('div', `${cssPrefix}`);

    this.rootEl.css({
      pointerEvents: 'none',
      overflow: 'hidden',
    });

    this.render();

    this.targetEl.appendChild(this.rootEl.el);
  }

  render() {
    const {
      text,
      itemWidth,
      itemHeight,
      color,
      rotate,
      horizontalCount,
      verticalCount,
      horizontalInterval,
      verticalInterval,
      horizontalOffset,
      verticalOffset,
    } = this.data.options;

    const { eventMap } = this.data;

    const { targetEl, rootEl } = this;
    this.rootEl.css({
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    });

    for (let i = 0; i < horizontalCount; i++) {
      for (let j = 0; j < verticalCount; j++) {
        const span = h('span', `${cssPrefix}-item`);

        span.html(text);
        span.css({
          top: verticalInterval
            ? `${verticalInterval * j + verticalOffset}px`
            : `${(100 / verticalCount) * j}%`,
          left: horizontalInterval
            ? `${horizontalInterval * i + horizontalOffset}px`
            : `${(100 / horizontalCount) * i}%`,
          display: 'inline-block',
          position: 'absolute',
          opacity: 1,
          color,
          transform: `rotate(${rotate}deg)`,
          width: itemWidth,
          height: itemHeight,
          whiteSpace: 'pre-line',
        });

        this.rootEl.child(span);
      }
    }

    const config = {
      childList: true,
      subtree: true,
      attributeFilter: ['style'],
    };

    const callback = function (mutationsList) {
      for (let mutation of mutationsList) {
        const removedNodes = mutation.removedNodes;
        let isRemoveMark = false;
        if (removedNodes.length > 0) {
          for (let i = 0; i < removedNodes.length; i++) {
            if (removedNodes[i] === rootEl.el) {
              isRemoveMark = true;
            }
          }
        }
        if (h(mutation.target).hasClass(`${cssPrefix}-item`)) {
          isRemoveMark = true;
        }
        if (mutation.target === rootEl.el || isRemoveMark) {
          if (eventMap.has('change')) {
            eventMap.get('change').call(null, mutationsList);
          } else {
            h(targetEl).html('');
          }
        }
      }
    };
    this.observer = new MutationObserver(callback);
    this.observer.observe(targetEl, config);
  }
  // event
  on(eventName, handler) {
    this.data.eventMap.set(eventName, handler);
  }
  // apis
  // 终止观察
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

const watermark = (el, options = {}) => new Watermark(el, options);

if (window) {
  window.watermark = watermark;
}

export default Watermark;
export { watermark };
