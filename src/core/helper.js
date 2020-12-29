const mergeDeep = (object = {}, ...sources) => {
  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      const v = source[key];
      if (
        typeof v === 'string' ||
        typeof v === 'number' ||
        typeof v === 'boolean'
      ) {
        object[key] = v;
      } else if (
        typeof v !== 'function' &&
        !Array.isArray(v) &&
        v instanceof Object
      ) {
        object[key] = object[key] || {};
        mergeDeep(object[key], v);
      } else {
        object[key] = v;
      }
    });
  });
  return object;
};

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function deepAssign(tagetObj, srcObj) {
  for (const key in srcObj) {
    if (isObject(srcObj[key])) {
      tagetObj[key] = deepAssign(
        tagetObj[key] ? tagetObj[key] : {},
        srcObj[key]
      );
    } else {
      tagetObj[key] = srcObj[key];
    }
  }
  return tagetObj;
}

export default {
  merge: (...sources) => mergeDeep({}, ...sources),
};
