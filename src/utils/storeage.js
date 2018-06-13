// let TAG = "sixi_vue_project";
let util = {};
/**
 * 存储localStorage
 */
util.setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
util.getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
util.removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

export default util;
