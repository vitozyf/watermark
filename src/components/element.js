class Element {
  constructor(tag, className = '') {
    if (typeof tag === 'string') {
      this.el = document.createElement(tag);
      this.el.className = className;
    } else {
      this.el = tag;
    }
  }

  on(eventNames, handler) {
    const [eventName, ...qualifier] = eventNames.split('.');
    this.el.addEventListener(eventName, (event) => {
      handler(event);
      for (let i = 0; i < qualifier.length; i++) {
        const q = qualifier[i];
        if (q === 'stop') {
          event.stopPropagation();
        }
      }
    });
    return this;
  }

  box() {
    return this.el.getBoundingClientRect();
  }

  parent() {
    return new Element(this.el.parentNode);
  }

  child(arg) {
    let ele = arg;
    if (typeof arg === 'string') {
      ele = document.createTextNode(arg);
    } else if (arg instanceof Element) {
      ele = arg.el;
    }
    this.el.appendChild(ele);
    return this;
  }

  children(...eles) {
    if (arguments.length === 0) {
      return this.el.childNodes;
    }
    eles.forEach((ele) => this.child(ele));
    return this;
  }

  removeChild(el) {
    this.el.removeChild(el);
  }

  contains(ele) {
    return this.el.contains(ele);
  }

  className(v) {
    if (v !== undefined) {
      this.el.className = v;
      return this;
    }
    return this.el.className;
  }

  addClass(name) {
    this.el.classList.add(name);
    return this;
  }

  hasClass(name) {
    return this.el.classList.contains(name);
  }

  removeClass(name) {
    this.el.classList.remove(name);
    return this;
  }

  prop(key, value) {
    if (value !== undefined) {
      this.el[key] = value;
    } else {
      if (typeof key === 'string') {
        return this.el[key];
      }
      Object.keys(key).forEach((k) => {
        this.el[k] = key[k];
      });
    }
    return this;
  }

  attr(key, value) {
    if (value !== undefined) {
      this.el.setAttribute(key, value);
    } else {
      if (typeof key === 'string') {
        return this.el.getAttribute(key);
      }
      Object.keys(key).forEach((k) => {
        this.el.setAttribute(k, key[k]);
      });
    }
    return this;
  }

  removeAttr(key) {
    this.el.removeAttribute(key);
    return this;
  }

  html(content) {
    if (content !== undefined) {
      this.el.innerHTML = content;
      return this;
    }
    return this.el.innerHTML;
  }
  text(content) {
    if (content !== undefined) {
      this.el.innerText = content;
      return this;
    }
    return this.el.innerText;
  }

  val(v) {
    if (v !== undefined) {
      this.el.value = v;
      return this;
    }
    return this.el.value;
  }

  focus() {
    this.el.focus();
  }

  css(name, value) {
    if (value === undefined && typeof name !== 'string') {
      Object.keys(name).forEach((k) => {
        this.el.style[k] = name[k];
      });
      return this;
    }
    if (value !== undefined) {
      this.el.style[name] = value;
      return this;
    }
    return this.el.style[name];
  }

  show() {
    this.css('display', 'block');
    return this;
  }

  hide() {
    this.css('display', 'none');
    return this;
  }
}

const h = (tag, className = '') => new Element(tag, className);

export { Element, h };
