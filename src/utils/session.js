let util = {};

// 保存数据到sessionStorage
util.setItem = (key, params) => {
  sessionStorage.setItem(key, JSON.stringify(params));
};

// 从sessionStorage获取数据
util.getItem = key => {
  return JSON.parse(sessionStorage.getItem(key));
};

// 从sessionStorage删除保存的数据
util.removeItem = key => {
  sessionStorage.removeItem(key);
};

// 从sessionStorage删除所有保存的数据
util.clear = key => {
  sessionStorage.clear();
};

export default util;
